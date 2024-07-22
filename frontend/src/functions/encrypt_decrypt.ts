import { HDKey } from "ed25519-keygen/hdkey";
import { ed25519 } from "@noble/curves/ed25519";

const bip39 = require("bip39");
const { sha256 } = require("js-sha256");
const aesjs = require("aes-js");

export function getSessionKey(password: string) {
  const hash = sha256.create();
  hash.update(password);
  const keyArray = new Uint8Array(hash.array());
  const encryptedBytes = aesjs.utils.hex.toBytes(
    window.localStorage.getItem("Chat_secret_key"),
  );
  const aesCtr1 = new aesjs.ModeOfOperation.ctr(keyArray, 1);
  const decryptedBytes = aesCtr1.decrypt(encryptedBytes);
  const decryptedHexKey = aesjs.utils.hex.fromBytes(decryptedBytes);
  window.sessionStorage.setItem("Chat_secret_key", decryptedHexKey);
  location.reload();
}

type EncriptData = {
  mnemonic: string;
  display_name: string;
  password: string;
};

export function encrypt(data: EncriptData) {
  const seed = bip39.mnemonicToSeedSync(data.mnemonic).toString("hex");
  const hdkey = HDKey.fromMasterSeed(seed);
  const address = Buffer.from(hdkey.publicKeyRaw).toString("hex");
  const secKey = Buffer.from(hdkey.privateKey).toString("hex");
  const hash = sha256.create();
  hash.update(data.password);
  const keyArray = new Uint8Array(hash.array());
  const textBytes = aesjs.utils.hex.toBytes(secKey);
  const aesCtr = new aesjs.ModeOfOperation.ctr(keyArray, 1);
  const encryptedBytes = aesCtr.encrypt(textBytes);
  const encryptedSecKey = aesjs.utils.hex.fromBytes(encryptedBytes);
  const msg = new TextEncoder().encode(data.display_name);
  const signature = Buffer.from(ed25519.sign(msg, secKey)).toString("base64");
  return {
    address: address,
    encryptedSecKey: encryptedSecKey,
    secKey: secKey,
    msg: msg,
    signature: signature,
  };
}

export function getSignature(display_name: string, secKey: string ) {
  const msg = new TextEncoder().encode(display_name);
  return Buffer.from(ed25519.sign(msg, secKey)).toString("base64");
}
