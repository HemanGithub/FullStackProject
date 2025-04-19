const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "food.db");
let database = null;

const secretKey = "BACKEND_DEVELOPMENT";

const initializeDatabase = async () => {
  try {
    database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(5000, () => {
      console.log("server started");
    });
  } catch (e) {
    console.log(`DB Error is ${e.message}`);
  }
};
initializeDatabase();

const formateOfferArray = (dbObject) => {
  return {
    offerId: dbObject.offer_id,
    offer: dbObject.offer,
    offerImage: dbObject.offer_image,
  };
};

const formateItemsArray = (dbObject) => {
  return {
    itemId: dbObject.item_id,
    name: dbObject.name,
    price: dbObject.price,
    description: dbObject.description,
    image: dbObject.image,
  };
};


const formateCartDetails = (dbObject)=>{
  return{
    itemId:dbObject.item_id,
    cartId:dbObject.cart_id,
    totalPrice:dbObject.total_price
  }
}

const formateCartItem = (dbObject)=>{
  return{
    itemId:dbObject.item_id,
    cartId:dbObject.cart_id,
    id:dbObject.id,
    name:dbObject.name,
    price:dbObject.price,
    description:dbObject.description,
    image:dbObject.image,
    quantity:dbObject.quantity
  }
}

// app.get("/delete",async(request,response)=>{
//   const query = `CREATE TABLE offer(
//     offer_id INTEGER NOT NULL PRIMARY KEY,
//     offer TEXT,
//     offer_image TEXT
//   );`
//   await database.run(query)
//   response.send("done")
// })

// app.post("/addOffer", async (request, response) => {
//   const query = `
//     INSERT INTO offer(offer,offer_image)
//     VALUES("Buy one get 2 free","https://couponswala.com/blog/wp-content/uploads/2022/09/Food-Combo-Offers.jpg.webp"),

//     ("50% offer on pizza","https://wpcdn.kuusoft.com/wp-content/uploads/sites/8/2023/08/07115323/Top5-Best-Fast-Food-Items-Cover-1200x628px.jpg"),

//     ("Best Home made pizza","https://pbs.twimg.com/media/EPLzeItU8AApdEt.jpg")
//     ;`
//     await database.run(query)
//     response.send("fdfdfd")
// })


// app.get("/",async(request,response)=>{
//   const query = 'DROP TABLE item'
//   const myQuery = `SELECT * FROM item`
//  const data = await database.all(myQuery)
//  console.log(data)
//   response.send(data)
// })

// app.get("/create",async (request,response)=>{
//     const myquery = `
//     CREATE TABLE item (
//       item_id INTEGER  NOT NULL PRIMARY KEY,
//       name VARCHAR(450),
//       price INT,
//       description TEXT,
//       image TEXT
//   );`
//     await database.run(myquery)

//     response.send("dcdfdfd")
// })

app.post("/add",async(request,response)=>{
  const query = `
  INSERT INTO item (
    name,price,description,image
  )
  VALUES
  ("Burger",150,"Der Name Berger steht seit über 100 Jahren für feinen Genuss aus der Schweizer Backstube. Der kompromisslose Fokus auf Qualität sowie der sympathische und eigenständige Auftritt der Marke macht Berger zum Schweizer Experten im Berei","https://static.toiimg.com/thumb/83565509.cms?width=1200&height=900"),
  ("Pizza",200,"Der Name Berger steht seit über 100 Jahren für feinen Genuss aus der Schweizer Backstube. Der kompromisslose Fokus auf Qualität sowie der sympathische und eigenständige Auftritt der Marke macht Berger zum Schweizer Experten im Berei","https://recipesblob.oetker.in/assets/d8a4b00c292a43adbb9f96798e028f01/1272x764/pizza-pollo-arrostojpg.webp"),
  ("Potato Chips",50,"Der Name Berger steht seit über 100 Jahren für feinen Genuss aus der Schweizer Backstube. Der kompromisslose Fokus auf Qualität sowie der sympathische und eigenständige Auftritt der Marke macht Berger zum Schweizer Experten im Berei","https://www.allrecipes.com/thmb/WyCC-RL8cuAEKfYHsdnzqi64iTc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/73135-homestyle-potato-chips-ddmfs-0348-3x4-hero-c21021303c8849bbb40c1007bfa9af6e.jpg"),
  ("French Fries",90,"Der Name Berger steht seit über 100 Jahren für feinen Genuss aus der Schweizer Backstube. Der kompromisslose Fokus auf Qualität sowie der sympathische und eigenständige Auftritt der Marke macht Berger zum Schweizer Experten im Berei","https://www.inspiredtaste.net/wp-content/uploads/2022/10/Baked-French-Fries-Recipe-1200.jpg"),
  ("Gobi",50,"Der Name Berger steht seit über 100 Jahren für feinen Genuss aus der Schweizer Backstube. Der kompromisslose Fokus auf Qualität sowie der sympathische und eigenständige Auftritt der Marke macht Berger zum Schweizer Experten im Berei","https://chaitrascreations.com/wp-content/uploads/2020/05/IMG_9424-scaled.jpg"),
  ("Noodles",60,"Der Name Berger steht seit über 100 Jahren für feinen Genuss aus der Schweizer Backstube. Der kompromisslose Fokus auf Qualität sowie der sympathische und eigenständige Auftritt der Marke macht Berger zum Schweizer Experten im Berei","https://i.ytimg.com/vi/J_b1Q7C18IU/maxresdefault.jpg")`
  await database.run(query)
    response.send("added")
})

app.delete("/delete",async(req,res)=>{
  const query = `DELETE FROM item`;
  await database.run(query)
  res.send("Deleteed")
})




// app.get("/update",async(request,response)=>{
//   const query = `UPDATE item
//   SET description="
//   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
//   "`
//   await database.run(query)
//   response.send("ok")
// })

// app.get("/manohar",async(request,response)=>{
//   const query = `DROP TABLE  cart_item `
//   const data = await database.all(query)
//   response.send(data)
// })

// app.get("/create", async (request, response) => {
//   const query = `CREATE TABLE cart_item(
//     id INTEGER NOT NULL PRIMARY KEY,
//     cart_id,
//     user_id,
//     quantity INTEGER,
//     FOREIGN KEY (user_id) REFERENCES user(user_id)  ON DELETE CASCADE
//     FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON DELETE CASCADE
//     )`;
//   await database.run(query);
//   response.send("created");
// });

// app.get("/delete", async (request, response) => {
//   const query = `DELETE FROM user WHERE user_id=5`;
//   await database.run(query);
//   response.send("deleted");
// });

// app.get("/get",async(request,response)=>{
//   const query = `SELECT * FROM user`
//   const data = await database.all(query)
//   response.send(data)
// })
// app.get("/create-table", async (request, response) => {
//   const query = `CREATE TABLE user(
//     user_id INTEGER NOT NULL PRIMARY KEY,
//     username VARCHAR(250),
//     name VARCHAR(250),
//     gender VARCHAR(10),
//     age INTEGER,
//     password VARCHAR(250)
//   )`;
//   await database.run(query);
//   response.send("careated");
// });

// app.get("/manohar",async(request,response)=>{
//   const query = `SELECT * FROM user`
//   const data = await database.all(query)
//   response.send(data)
// })

const authenticateToken = (request,response,next)=>{
  const authHeaders = request.headers["authorization"]
  let jwtToken 
  if(authHeaders!==undefined){
    jwtToken = authHeaders.split(" ")[1]
  }else{
    response.status(400)
    response.send("Invalid Access Token")
  }

  if(jwtToken!==undefined){
    jwt.verify(jwtToken,secretKey,async(error,payload)=>{
      if(error){
        response.status(400)
        response.send("Invalid Access Token")
      }else{
        const userQuery = `SELECT user_id AS userId FROM user WHERE username='${payload.username}'`;
        const userData = await database.get(userQuery);

        request.userId=userData.userId 
        request.username=userData.username
        const cartQuery = `SELECT cart_id AS cartId FROM cart 
         WHERE cart.user_id=${userData.userId} `
         const cartData = await database.get(cartQuery)
        const cartId = cartData.cartId
        request.cartId=cartId
        next()
      }
    })
  }
}

app.get("/offer",async(request,response)=>{
  const query = `SELECT * FROM offer`
  const data = await database.all(query)
  response.send(data)

})

app.post("/user", async (request, response) => {
  const { username, name, password, gender, age } = request.body;
  console.log(username, name, password, gender, age);
  const query = `SELECT * FROM user WHERE username='${username}'`;
  const dbUser = await database.get(query);
  if (dbUser === undefined) {
    if (password.length < 5) {
      response.status(400);
      response.send("Password Too Short");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = `INSERT INTO user(username,name,gender,age,password)
      VALUES(
        '${username}',
        '${name}',
        '${gender}',
        ${age},
        '${hashedPassword}'
      )`;
      await database.run(createUser);

      const totalPrice = 0
      
      const idQuery = `SELECT user_id AS userId FROM user WHERE username='${username}'`;
      const data = await database.get(idQuery);
      const userId = data.userId

      if(userId!==undefined){
        const query = `
        INSERT INTO cart(user_id,total_price)
        VALUES(
          ${userId},
          ${totalPrice}
        )`;
        await database.run(query);
      }

      response.status(200);
      response.send("User Created Successfully");
    }
  } else {
    response.status(400);
    response.send("User Already Exists");
  }
});

app.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const query = `SELECT * FROM user WHERE username='${username}'`;
  const dbUser = await database.get(query);
  if (dbUser !== undefined) {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched) {
      const payload = { username: username };
      const jwtToken = jwt.sign(payload, secretKey);

      response.send({ jwtToken });
    } else {
      response.status(400);
      response.send("Incorrect Password");
    }
  } else {
    response.status(400);
    response.send("User Not Found");
  }
});

app.get("/offers",authenticateToken, async (reqest, response) => {
  const query = `
    SELECT * FROM offer`;
  const data = await database.all(query);
  response.send(data.map((eachItem) => formateOfferArray(eachItem)));
});

app.get("/items",authenticateToken, async (request, response) => {

  const query = `SELECT * FROM item`;
  const data = await database.all(query);
  response.send(data.map((eachItem) => formateItemsArray(eachItem)));
  
});



app.get("/items/:itemId",authenticateToken, async (request, response) => {
  const { itemId } = request.params;
  const query = `SELECT * FROM item WHERE item_id=${itemId}`;
  const data = await database.get(query);
  response.send(formateItemsArray(data));
});


// app.get("/user/:username", async (request, response) => {
//   const { username } = request.params;
//   const query = `SELECT user_id AS userId FROM user WHERE username='${username}'`;
//   const userId = await database.get(query);
//   response.send(userId);
// });

// app.post("/create-cart", async (request, response) => {
// const totalPrice = 0
// const {userId} = request
//   const query = `
//   INSERT INTO cart(user_id,total_price)
//   VALUES(
//     ${userId},
//     ${totalPrice}
//   )`;
//   await database.run(query);
//   response.send("inserted");
// });

// app.get("/create-manohar", async (request, response) => {
//   const query = `CREATE TABLE cart_item(
//     id INTEGER NOT NULL PRIMARY KEY,
//     cart_id,
//     item_id,
//     quantity INTEGER,
//     FOREIGN KEY (item_id) REFERENCES item(item_id)  ON DELETE CASCADE,
//     FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON DELETE CASCADE
//     )`;
//   await database.run(query);
//   response.send("created");
// });

// app.get("/cart-manohar",async(request,response)=>{
//   const query = `SELECT * FROM cart_item`
//   const data = await database.all(query)
//   response.send(data)
// })


app.get("/hemanth",async(request,response)=>{
  const query = `SELECT * FROM cart_item;
  SELECT * FROM cart;
  SELECT * FROM cart_item;
  SELECT * FROM cart;`
  const data = await database.all(query)
  response.send(data)
})

app.get("/delete",async (request, response)=>{
  const query = `DELETE  FROM user`
  await database.run(query)
  response.send("delteted")
})

app.get("/code",authenticateToken,async (request, response)=>{
  const {cartId} = request 
  const query = `SELECT SUM(price) total FROM cart_item
  INNER JOIN item ON item.item_id=cart_item.item_id
  WHERE cart_id=${cartId}`
  const data = await database.all(query)
  response.send(data)
})

app.get("/cart/total",authenticateToken,async(request,response)=>{
  const {userId} = request
  const {cartId} = request

  const itemsPrice = `SELECT SUM(price*quantity) AS total FROM item
  INNER JOIN cart_item ON cart_item.item_id=item.item_id
  WHERE cart_item.cart_id=${cartId}`

  const totalPrice = await database.all(itemsPrice)
  response.send(totalPrice)
})

app.put("/update/cart",authenticateToken, async (request, response)=>{
  const {userId} = request
  const {cartId} = request 
  const query = `UPDATE cart
  SET total_price=
  (
    SELECT SUM(price*cart_item.quantity) total FROM cart_item
  INNER JOIN item ON item.item_id=cart_item.item_id
  WHERE cart_id=${cartId}
  )
  `
  // const query = `UPDATE cart_item
  // SET totalPrice=`
  await database.run(query)
  response.send("updated")
})


app.get("/cart/items",authenticateToken,async(request,response)=>{
  const {cartId} = request
  if(cartId===undefined){
    response.status(400)
    response.send("No Cart Exists")
  }else{
    const query = `
    SELECT * FROM cart_item
    INNER JOIN item ON item.item_id=cart_item.item_id
    WHERE cart_item.cart_id=${cartId}`
  
    const myData = await database.all(query)
    response.send(myData.map(eachItem=>formateCartItem(eachItem)))
  }
})

app.post("/add-item",authenticateToken, async (request, response) => {
  const {cartId} = request
  
  const { itemId, quantity } = request.body;
  
  console.log(cartId,itemId,quantity)

  const query = `INSERT INTO cart_item(item_id,cart_id,quantity)
  VALUES(
    ${itemId},
    ${cartId},
    ${quantity}
  )`;
  await database.run(query);
  response.send("Item Added");
});

app.put("/cart/:itemId",authenticateToken,async(request,response)=>{
  const {cartId} = request
  const {itemId} = request.params
  const {quantity} = request.body
  const query = `UPDATE cart_item
  SET quantity=${quantity}
  WHERE cart_item.item_id=${itemId} AND cart_item.cart_id=${cartId}`

  await database.run(query)
  response.send("updated")

})

app.delete("/cart/:itemId",authenticateToken,async(request, response)=>{
  const {cartId} = request
  const {itemId} = request.params
  const query =  `DELETE  FROM cart_item
  WHERE item_id=${itemId} AND cart_id=${cartId}`
  await database.run(query)
  response.send("deleted")
})




// app.get("/cart/:username",async(request,response)=>{
//   const {username} = request.params
//   const query =`SELECT *  FROM cart 
//   INNER JOIN user ON user.user_id=cart.user_id
//   WHERE user.username='${username}'`
//   const data = await database.get(query)
//   response.send(formateCartDetails(data))
// })

app.get("/users",async(request,response)=>{
  const query = `SELECT * FROM user`
  const data = await database.all(query)

  const manohar = `SELECT * FROM cart`
  const newData = await database.all(manohar)
  console.log(newData)
  response.send(data)

})