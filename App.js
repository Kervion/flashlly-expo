import { StyleSheet, View, Text } from "react-native"
import { useEffect } from "react"
import SNSMobileSDK from "@sumsub/react-native-mobilesdk-module"

const SERVER = "http://192.168.0.171:3000/sumsub-access-token"
const TOKEN = "_act-sbx-9aa33b74-42c7-4220-9af5-55352f85aff5"

export default function App() {
  useEffect(() => {
    // launchSNSMobileSDK(TOKEN)
    fetchToken()
  }, [])

  const fetchToken = async () => {
    try {
      const response = await fetch(SERVER)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      // THE ANSWER MAY BE SLIGHTLY DIFFERENT ON YOUR SERVER
      console.log("TOKEN : ", data.token.token)
      launchSNSMobileSDK(data.token.token)
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  const launchSNSMobileSDK = (acct) => {
    const snsMobileSDK = SNSMobileSDK.init(acct, () => {
      return fetch(SERVER, {
        method: "GET",
      }).then((resp) => {
        const data = resp.json()
        return data.token.token
      })
    })
      // THOSE ARE ONLY OPTIONAL CONFIGURATIONS
      .withHandlers({
        onStatusChanged: (event) => {
          console.log("onStatusChanged: [" + event.prevStatus + "] => [" + event.newStatus + "]")
        },
        onLog: (event) => {
          console.log("onLog: [Idensic] " + event.message)
        },
      })
      .withDebug(true)
      .withLocale("en")
      // END OF OPTIONAL CONFIGURATIONS
      .build()

    console.log("builded")
    // UNTIL HERE EVERYTHING IS OK, THEN LAUNCH NULL IS RETURNED

    snsMobileSDK
      .launch()
      .then((result) => {
        console.log("SumSub SDK State: " + JSON.stringify(result))
      })
      .catch((err) => {
        console.log("SumSub SDK Error: " + JSON.stringify(err))
      })
  }

  return (
    <View style={styles.container}>
      <Text>Checking Sumsub Library</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
