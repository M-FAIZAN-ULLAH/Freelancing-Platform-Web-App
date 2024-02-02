import axios from "axios"

const upload = async (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "Fiverr")
    try {
      const res = await axios.post(
        "your-api-keyo-of-cloud",
        data
      )

      const { url } = res.data
      return url
    } catch (error) {
      console.log(error)
    }
  }

  export default upload
