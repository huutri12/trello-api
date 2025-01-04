

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khởi tạo một đối tượng trelloDatabaseInstance ban đầu là null ( vì chúng ta chưa connect )
let trelloDatabaseInstance = null

// Khởi tạo một đối tượng Client Instance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Lưu ý: cái serverAPI có từ phiên bản 5.0.0 trở lên, có thể không cần dùng nó , còn nếu dùng nó là chúng
  // ta sẽ chỉ định một cái Stable API Version của MongoDb
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Kết nối tới Database connectDB
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công thì lấy ra Database theo tên và gán ngược lại nó vào biến trelloDatabaseInstance ở trên của chúng ta.
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Đóng kết nối tới Database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

/** Function GET_DB (không async) này có nhiệm vụ export ra cái TRELLO DATABASE INSTANCE sau khi đã connect thành
 * công tới MONGODB để chúng ta sử dụng ở nhiều nơi khác nhau trong code. */
// Lưu ý phải đảm bảo chỉ luôn gọi cái getDB này sau khi đã kết nối thành công tới MONGODB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}


