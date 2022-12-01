/* Imports PubNub JavaScript and React SDKs to create and access PubNub instance accross your app. */
/* Imports the required PubNub Chat Components to easily create chat apps with PubNub. */
import React from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, MessageList, MessageInput, MemberList } from "@pubnub/react-chat-components";

/* Creates and configures your PubNub instance. Be sure to replace "myPublishKey" and "mySubscribeKey"
  with your own keyset. If you wish, modify the default "myFirstUser" userId value for the chat user. */
const pubnub = new PubNub({
  publishKey: "myPublishKey",
  subscribeKey: "mySubscribeKey",
  userId: "myFirstUser",
});
const currentChannel = "Default";
const theme = "light";

function App(): JSX.Element {
  return (
    <PubNubProvider client={pubnub}>
      {/* PubNubProvider is a part of the PubNub React SDK and allows you to access PubNub instance
        in components down the tree. */}
      <Chat {...{ currentChannel, theme }}>
      <MemberList
    presentMembers={[
      "user_3c4400761cba4b65b77b6cae55fc21eb",
      "user_def709b1adfc4e67b98bb7a820f581b1",
      "user_a56c20222c484ff8987ec9b69b0c8f5b"
    ]}
    members={[
    {
        "name": "Mark Kelley",
        "custom": {
            "title": "Office Assistant"
        },
        "email": null,
        "eTag": "AYGyoY3gre71eA",
        "externalId": null,
        "id": "user_63ea15931d8541a3bd35e5b1f09087dc",
        "profileUrl": "https://randomuser.me/api/portraits/men/1.jpg",
        "updated": "2020-09-23T09:23:34.598494Z"
    },
    {
        "name": "Anna Gordon",
        "custom": {
            "title": "VP Marketing"
        },
        "email": null,
        "eTag": "AZDyqJ7andTHlAE",
        "externalId": null,
        "id": "user_3c4400761cba4b65b77b6cae55fc21eb",
        "profileUrl": "https://randomuser.me/api/portraits/women/1.jpg",
        "updated": "2020-09-23T09:23:33.598365Z"
    },
  ]}
  />
        {/* Chat is an obligatory state provider. It allows you to configure some common component
          options, like the current channel and the general theme for the app. */}
        <MessageList />
        <MessageInput />
      </Chat>
    </PubNubProvider>
  );
}

export default App;