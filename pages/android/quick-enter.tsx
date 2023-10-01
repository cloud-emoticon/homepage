import React from "react"
import Head from "next/head";
import Link from "next/link";

export default function AndroidPrivacy() {
    return (
        <>
            <Head>
                <title>Android &quot;Quick enter&quot; guide</title>
            </Head>
            <h1>Android &quot;Quick enter&quot; guide</h1>
            <h2>1. Introduction</h2>
            <p>&quot;Quick enter&quot; is a feature that allows you to quickly enter an emoticon by its shortcut</p>
            <p>For example, if you have an emoticon &quot;ლ(╹◡╹ლ)&quot; with shortcut &quot;kt&quot;</p>
            <p>Anywhere you type &quot; :kt&quot; (notice the space and :) will then be replaced by &quot;ლ(╹◡╹ლ)&quot;</p>
            <p>Here is a video demo. Also notice that you do not need a space if it is beginning of the text.</p>
            <video autoPlay muted loop style={{ width: '100%', height: '75px', objectFit: 'contain' }}>
                <source src="/android-quick-enter.mp4" type="video/mp4" />
            </video>
            <p>Notice that this feature only works on Android Lollipop (5.0) and above</p>
            <h2>2. Enable this feature</h2>
            <p>1. Open the app. From the three dots on the top-right corner, go to &quot;Settings&quot;</p>
            <p>2. Tap &quot;Set up quick enter&quot;</p>
            <p>3. Make sure you have reviewed the disclosure and tap &quot;I agree&quot;</p>
            <p>4. Enable &quot;Cloud Emoticon&quot; in the next screen. Here are detailed instructions for some brands</p>
            <h3>Pixel devices</h3>
            <p>1. Tap &quot;Cloud Emoticon&quot; under &quot;Downloaded apps&quot;</p>
            <p>2. Toggle &quot;Use Cloud Emoticon&quot;</p>
            <p>3. On the dialog, tap &quot;Allow&quot;</p>
            <h3>Samsung devices</h3>
            <p>1. Tap &quot;Installed apps&quot;</p>
            <p>2. Tap &quot;Cloud Emoticon&quot;</p>
            <p>3. Toggle &quot;On&quot;</p>
            <p>4. On the dialog, tap &quot;Allow&quot;</p>
            <h2>3. Make sure you have shortcuts for emoticons</h2>
            <p>1. Open the app and go to the &quot;Bookmarks&quot; tab</p>
            <p>2. For any of your bookmark, tap the pencil button on the right</p>
            <p>3. Enter a shortcut for the emoticon and tap &quot;OK&quot;</p>
            <h2>4. Disable this feature</h2>
            <p>1. Open the app. From the three dots on the top-right corner, go to &quot;Settings&quot;</p>
            <p>2. Tap &quot;Disable quick enter&quot;</p>
            <p>3. Disable &quot;Cloud Emoticon&quot; in the next screen. Here are detailed instructions for some brands</p>
            <h3>Pixel devices</h3>
            <p>1. Tap &quot;Cloud Emoticon&quot; under &quot;Downloaded apps&quot;</p>
            <p>2. Toggle &quot;Use Cloud Emoticon&quot;</p>
            <h3>Samsung devices</h3>
            <p>1. Tap &quot;Installed apps&quot;</p>
            <p>2. Tap &quot;Cloud Emoticon&quot;</p>
            <p>3. Toggle &quot;Off&quot;</p>
        </>
    )
}
