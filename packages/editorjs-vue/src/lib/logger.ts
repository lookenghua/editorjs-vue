export class LogUtil {
  static i(message: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log(message.toString())
    }
  }
}
