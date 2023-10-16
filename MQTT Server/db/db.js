
export const DbConnet = async (mongoose)=>{
    try {
       await mongoose.connect('mongodb://127.0.0.1:27017/accolade4GQA?');
       console.log('database connected sucessfully');
    } catch (error) {
        
    }
}