# Dynos 🦖

Dynos is a third-party app for [Memos](https://usememos.com/) for iOS and Android.

## Disclaimer

This is the most barebones it can get. Dynos doesn't even have a logo yet... I created this app just for myself (and partly as a learning project), but decided to open-source it since I currently don't have the time to work on it anymore. Maybe someone else might find it useful though :)

If you are looking for an actual third-party app and don't care about offline functionality, you can check out [Moe Memos](https://memos.moe/) - it looks really clean and has lots of features (the dev stated that offline functionality will come, yaay)!

## Why though

I was looking for a self-hosted alternative to store my journal entries and stumbled upon [Memos](https://usememos.com/), which is actually meant for any kind of notes (including journal entries). Unfortunately, I realized that Memos neither has its own app nor - more importantly - **offline functionality**.

So I just tried to create my own app for this problem.

## Features

- Connect to your Memos instance
- View your memos in a timeline
- Create, delete, update memos
- Open a calendar to see which days you didn’t write a memo
- Filter memos by keyword or date
- **Do all of this offline as well**
  - As soon as you have a connection to your Memos instance again, it will automatically create, update, delete, or refresh everything

## How does it work

The app is built with [Expo](https://expo.dev/), and offline functionality is implemented thanks to [Legend State](https://github.com/LegendApp/legend-state). The app is basically a Memos API wrapper and stores fetched memos locally or sends requests to post a memo to the server, respectively.

## Installation

The app is currently not available in any app store. However, feel free to sideload the `.ipa` file on iOS using [AltStore](https://altstore.io/) or the `.apk` file on Android.

## How to build and develop yourself

1. Install dependencies

   ```bash
   pnpm install

2. Start the app

   ```bash
   pnpm expo start

For more information please check out the [Expo Documentation](https://docs.expo.dev/)

## Contributions

Contributions are welcome - whether they are issue reports, PRs or plain feedback! ^^
