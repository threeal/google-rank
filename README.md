# Google Rank

[![npm version](https://img.shields.io/npm/v/google-rank?style=flat-square)](https://www.npmjs.com/package/google-rank)
[![license](https://img.shields.io/github/license/threeal/google-rank?style=flat-square)](./LICENSE)
[![build status](https://img.shields.io/github/actions/workflow/status/threeal/google-rank/build.yaml?branch=main&style=flat-square)](https://github.com/threeal/google-rank/actions/workflows/build.yaml)

Google Rank is a tool designed to provide valuable insights into website visibility on [Google](https://www.google.com/) search results. By tracking and monitoring your website's ranking for specific keywords, you can optimize your online presence and effectively reach a wider audience.

Whether you're an SEO specialist, a digital marketer, or a website owner, Google Rank empowers you to enhance your website's performance in search engine rankings. With this tool, you can stay informed about your website's visibility, make data-driven decisions, and improve your overall online presence.

## Installation

To install the `google-rank` tool globally, run the following command:

```
$ npm install --global google-rank
```

## Usage

To retrieve the rank of a website for a specific keyword, run the `google-rank` tool followed by the website URL and the search keyword:

```
$ google-rank wikipedia.org krakatoa

Ranks for wikipedia.org website:
1 krakatoa
```

Multiple keywords can also be specified:

```
$ google-rank wikipedia.org krakatoa mit 'social media'

Ranks for wikipedia.org website:
1 krakatoa
2 mit
1 social media
```

If the website is not found for the specified keywords, it will output the rank as `?`:

```
$ google-rank wikipedia.org 'best city to travel'

Ranks for wikipedia.org website:
? best city to travel
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2023 [Alfi Maulana](https://github.com/threeal)
