// css 类传参
// 在类的参数传递中我们用constructor() 进行传参。 传递参数后可以直接使用this.xxx进行调用。
export default class Singer {
    constructor({ id, name }) {
        this.id = id
        this.name = name
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
    }
}