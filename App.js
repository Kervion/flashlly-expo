import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
// import axios from "axios"
import { useEffect } from "react"
import SNSMobileSDK from "@sumsub/react-native-mobilesdk-module"

// console.log(Object.keys(SNSMobileSDK))
// SNSMobileSDK.init("token", () => {
//   console.log("kuku 1")
//   // build()
// })

export default function App() {
  const fetchToken = async () => {
    try {
      const response = await fetch("http://192.168.0.171:3000/sumsub-access-token")
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      return data.token.token
      // console.log(data.token.token)
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  function listAllMethods(obj) {
    let methods = new Set()
    while (obj) {
      Object.getOwnPropertyNames(obj).forEach((property) => {
        if (typeof obj[property] === "function" && property !== "constructor") {
          methods.add(property)
        }
      })
      obj = Object.getPrototypeOf(obj)
    }
    return Array.from(methods)
  }

  let launchSNSMobileSDK = async () => {
    let accessToken = "123"
    // let accessToken = await fetchToken()
    // console.log("accessToken: " + accessToken)
    let snsMobile = SNSMobileSDK.init(accessToken, () => {})
    const build = await snsMobile.build()

    console.log(Object.keys(build))
    console.log(Object.keys(build.sdkConf))
    console.log(listAllMethods(snsMobile))

    // let wynik = await snsMobile?.launch()

    // snsMobile.build().then(() => {
    //   console.log(listAllMethods(snsMobile))
    // })

    // console.log("kukux")
    // console.log(Object.keys(snsMobile))

    // console.log(snsMobile.debug)
    // console.log(snsMobile.isAnalyticsEnabled)
    // console.log(snsMobile.handlers)
    // console.log(snsMobile.applicantConf)
    // console.log(snsMobile.preferredDocumentDefinitions)
    // console.log(snsMobile.autoCloseOnApprove)
    // console.log(snsMobile.settings)
    // console.log(snsMobile.accessToken)
    // console.log(snsMobile.tokenExpirationHandler)

    // snsMobile
    //   .launch()
    //   .then((result) => {
    //     console.log("SumSub SDK State: " + JSON.stringify(result))
    //   })
    //   .catch((err) => {
    //     console.log("SumSub SDK Error: " + JSON.stringify(err))
    //   })
  }

  useEffect(() => {
    launchSNSMobileSDK()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Checking Sumsub Library</Text>
      {/* <StatusBar style="auto" /> */}
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
