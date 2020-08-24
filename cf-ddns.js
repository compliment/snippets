#!/usr/bin/env node

const EMAIL = "e@ma.il";
const X_AUTH_KEY = "ABCDE";
const ZONE = "ABCDE";

const os = require("os");
const fetch = require("node-fetch");
const cf = require("cloudflare")({
    email: EMAIL,
    key: X_AUTH_KEY
});

(async function() {
    const record_name = `${os.hostname}.example.com`;

    const response = await fetch("http://ipapi.co/ip");
    const ip = (await response.text()).trim();

    const records = (await cf.dnsRecords.browse(ZONE)).result;

    const id = (function() {
        for (let record of records) {
            if (record.name == record_name)
                return record.id;
        }
    })();

    if (id === undefined) {
        console.log(await cf.dnsRecords.add(ZONE, {
            type: "A",
            name: record_name,
            content: ip
        }));
    } else {
        console.log(await cf.dnsRecords.edit(ZONE, id, {
            type: "A",
            name: record_name,
            content: ip
        }));
    }
})()
