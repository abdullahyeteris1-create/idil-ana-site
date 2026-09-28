import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import ts from "typescript";

function loadTracking(windowValue) {
  const sourceUrl = new URL("../lib/tracking.ts", import.meta.url);
  const filename = fileURLToPath(sourceUrl);
  const source = fs.readFileSync(sourceUrl, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const commonJsModule = { exports: {} };
  const context = vm.createContext({
    exports: commonJsModule.exports,
    module: commonJsModule,
    window: windowValue,
  });

  vm.runInContext(transpiled, context, { filename });
  return commonJsModule.exports;
}

test("InitiateCheckout bir tıklama için doğru paket verileriyle bir kez gönderilir", () => {
  const calls = [];
  const tracking = loadTracking({ fbq: (...args) => calls.push(args) });

  tracking.trackInitiateCheckout({
    contentName: "1 Yıllık Paket",
    price: "1.999 TL",
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], "track");
  assert.equal(calls[0][1], "InitiateCheckout");
  assert.deepEqual({ ...calls[0][2] }, {
    value: 1999,
    currency: "TRY",
    content_name: "1 Yıllık Paket",
  });
});

test("tüm mevcut paket fiyatları aynı veri biçiminden sayısal değere çevrilir", () => {
  const tracking = loadTracking({});

  assert.equal(tracking.parsePriceForTracking("399 TL"), 399);
  assert.equal(tracking.parsePriceForTracking("699 TL"), 699);
  assert.equal(tracking.parsePriceForTracking("1.299 TL"), 1299);
  assert.equal(tracking.parsePriceForTracking("1.999 TL"), 1999);
});

test("Meta Pixel yüklenmediyse event gönderimi sessizce atlanır", () => {
  const tracking = loadTracking({});

  assert.doesNotThrow(() =>
    tracking.trackInitiateCheckout({ contentName: "1 Aylık Paket", price: "399 TL" }),
  );
});

test("mevcut iletişim formu GA4, Google Ads ve Meta Lead event'leri korunur", () => {
  const fbqCalls = [];
  const gtagCalls = [];
  const tracking = loadTracking({
    fbq: (...args) => fbqCalls.push(args),
    gtag: (...args) => gtagCalls.push(args),
  });

  tracking.trackContactFormSuccess();

  assert.equal(gtagCalls.length, 2);
  assert.equal(gtagCalls[0][0], "event");
  assert.equal(gtagCalls[0][1], "generate_lead");
  assert.equal(gtagCalls[1][1], "conversion");
  assert.equal(fbqCalls.length, 1);
  assert.equal(fbqCalls[0][0], "track");
  assert.equal(fbqCalls[0][1], "Lead");
});
