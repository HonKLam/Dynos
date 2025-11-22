# Dynos 🦖

Dynos is a third-party app for [Memos](https://usememos.com/) for iOS and Android.

[AltStore Button]: https://img.shields.io/badge/Download-AltStore-green?style=flat
[AltStore Link]: https://honklam.github.io/altstore.html 'Download with AltStore'

[SideStore Button]: https://img.shields.io/badge/Download-SideStore-purple?style=flat
[SideStore Link]: https://honklam.github.io/sidestore.html 'Download with SideStore'

[![AltStore Button]][AltStore Link]
[![SideStore Button]][SideStore Link]

<p align="center">
  <img src="https://github.com/user-attachments/assets/67ddd137-07c5-4074-94f8-201be990fd67" width="300" />
  <img src="https://github.com/user-attachments/assets/453205eb-d3e0-469a-8569-d427cbee2235" width="300" />
</p>

## Disclaimer

This is the most barebones it can get. Dynos doesn't even have an icon yet... I created this app just for myself (and partly as a learning project), but decided to open-source it since I currently don't have the time to work on it anymore. Maybe someone else might find it useful though :)

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

## Installation

The app is currently not available in any official app store. However, feel free to sideload the app on iOS using [AltStore](https://altstore.io/) or [SideStore](https://sidestore.io/) (links are at the top of the README) or download the `.apk` file from the release page and install the file directly on Android.

## How to use the App

The first time the app is opened you will be greeted with a login screnn. Dynos requires an `URL` to your Memos instance *and* an access token. You can create a token in the `Settings` of your Memos instance. Give it a description and set the expiration date!

> Keep in mind that setting the expiration date of the access token to `never` can be a security risk! If you are using Dynos and the token expires you can manually reset the credentials in the Dynos settings and put in a new access token.

After loggin in your Memos should be fetched from your server and a new Memo should appear at the top of your timeline, welcoming you to the app. It will always appear after putting in your credentials (this is currently intended since it solves a bug...). Feel free to delete this Memo! 

You can now use the offline functionality. As soon as the connection to the server is available again it will automatically sync your changes you made within Dynos!

Feel free to explore the rest of the app. It should be straight forward :)

## How does the app work

The app is built with [Expo](https://expo.dev/), and offline functionality is implemented thanks to [Legend State](https://github.com/LegendApp/legend-state). The app is basically a Memos API wrapper and stores fetched memos locally or sends requests to post a memo to the server, respectively.

## How to develop the app yourself

1. Install dependencies

   ```bash
   pnpm install

2. Start the app

   ```bash
   pnpm expo start

For more information please check out the [Expo Documentation](https://docs.expo.dev/)

## Contributions

Contributions are welcome - whether they are issue reports, PRs or plain feedback! ^^
