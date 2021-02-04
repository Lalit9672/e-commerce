const mongoose=require("mongoose")
const bodyparser=require("body-parser")
const cookieParser=require("cookie-parser");
const cors=require("cors")
const manuRoutes=require('./routes/manufacturer')

const express=require("express")
const app=express();
const paymentRoutes=require("./routes/payment")
const productRoutes=require("./routes/product");
const authRoutes=require("./routes/auth");
mongoose.connect("mongodb://localhost:27017/manu-retail",
{
    useUnifiedTopology :true,
    useNewUrlParser:true,
    useCreateIndex:true 
}).then(response=>console.log("DB CONNECTED")).catch(err=>console.log(err));
app.use(bodyparser.json())
app.use(cookieParser())
app.use(cors())
app.use("/api",productRoutes);
app.use("/api",authRoutes);
app.use("/api",manuRoutes);
app.use("/api",paymentRoutes)

const PORT=4001;
app.listen(PORT,()=>
{
    console.log(`App is Running at ${PORT}`)
});
