import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [first, setfirst] = useState([])

  const [obj, setObj] = useState({
    // Name:"",
    // Phone:"",
    // Email:""
  });

  const addToState = (event) => {
    setObj({ ...obj, [event.target.name]: event.target.value });
  };

  async function StoreDb (){
    let api = await fetch("http://localhost:5000/insert",{
      method:"post",
      body:JSON.stringify(obj),
      headers:{'Content-Type':'application/json'}
    });

    api = await api.json();
    if(api.acknowledged){
      alert("data save")
    }
    else
    alert("sorry")


  }

  async function delDb(event){
    var api = await fetch("http://localhost:5000/delete",{
      method:"post",
      body:JSON.stringify({Name:event.target.id}),
      headers:{
        'Content-Type':'application/json'
    
    }
    })
    var api = await api.json();
    if(api.acknowledged){
      update()
    }
    else
    alert("sorry")
  }
  
  async function update(){
    var data=await fetch('http://localhost:5000/getdb',{
      method:"get",
      headers:{'Content-Type':'application/json'}
    });

    data = await data.json();
    setfirst(data)
  
    
  }
  useEffect(()=>{
    update()
    
  },[])

  return (
    <div className="col-md-4 col-md-offset-4" id="login">
      <section id="inner-wrapper" className="login">
        <article>
          <form>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-user"> </i>
                </span>
                <input
                  type="text"
                  onChange={addToState}
                  name="Name"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-envelope"> </i>
                </span>
                <input
                  name="Email"
                  onChange={addToState}
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-key"> </i>
                </span>
                <input
                  onChange={addToState}
                  name="Password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success btn-block" onClick={StoreDb}>
              Submit
            </button>
           
          </form>
        </article>
      </section>
      <section>
      <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
      <th>operations</th>
    </tr>
  </thead>
  <tbody>
    {
      first.map((item,index)=>{
        return(
          <tr>
          <td scope="row">{index}</td>
          <td>{item.name}</td>
          <td>{item.Email}</td>
          <td>{item.Password}</td>
          <td><button onClick={delDb} className="btn btn-danger btn-sm" id={item.Name}>delete</button></td>
        </tr>
        )
      })
    }
   

  </tbody>
</table>

      </section>
    </div>
  );
};

export default App;
