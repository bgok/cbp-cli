# cbp-cli

A simple project that demonstrates how to test which permissions that
a CBP token has.

Sadly, this does not work in webapps due to CORS restrictions.

| Token Type | View Allowed | Trade Allowed | Transfer Allowed |
|------------|--------------|---------------|------------------|
| transfer   | :x:          | :x:           | :heavy_check_mark: |
| view       | :heavy_check_mark: | :x: | :x: |
| trade      | :heavy_check_mark: | :heavy_check_mark: | :x: |
