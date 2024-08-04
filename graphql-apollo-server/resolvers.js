const resolveProduct = (parent, args, context, info) => {
   /* fetch data from some resource
   const response = fetch(`https://api.example.com/product`);*/

   return {
       name: "pants",
       price: 20,
       count:  1,
       color: "blue"
   }
}

module.exports = {resolveProduct}
