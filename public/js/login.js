//For Logging In Existing Users

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector("#loginForm");
  
  loginBtn?.addEventListener("submit", (e) => {
      e.preventDefault();

      const myForm = new FormData(document.forms.loginForm);
      let formObj = {};
      for(let data of myForm) {
          formObj[data[0]] = data[1];
      }

      const jsonFormObj = JSON.stringify(formObj);
      console.log(jsonFormObj);
      //Fetch API
      fetch("/checkAccount", {
          method: "POST",
          body: jsonFormObj,
          headers: {
              'Content-Type': 'application/json'
          }
      }).then((res) => 
          res.json()
          // console.log(`Server responded: ${res.text}`);
          // //window.location.replace("/homepage")
      ).then(data => {
          console.log(data);
          if(data){
              window.location.replace("/homepage")
          }else{
              alert("Incorrect Credentials");
          }
      }).catch(err => {
          console.error(err);
      });
  })
});