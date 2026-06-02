const API =
  "http://localhost:5000/api/auth";

function showSignup() {

  document.getElementById(
    "signupForm"
  ).style.display = "block";

  document.getElementById(
    "loginForm"
  ).style.display = "none";

  document.getElementById(
    "signupTab"
  ).classList.add("active");

  document.getElementById(
    "loginTab"
  ).classList.remove("active");
}

function showLogin() {

  document.getElementById(
    "signupForm"
  ).style.display = "none";

  document.getElementById(
    "loginForm"
  ).style.display = "block";

  document.getElementById(
    "loginTab"
  ).classList.add("active");

  document.getElementById(
    "signupTab"
  ).classList.remove("active");
}

async function signup() {

  const response = await fetch(
    `${API}/signup`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({

        name:
          document.getElementById(
            "signupName"
          ).value,

        email:
          document.getElementById(
            "signupEmail"
          ).value,

        password:
          document.getElementById(
            "signupPassword"
          ).value,

        role:
          document.getElementById(
            "signupRole"
          ).value
      })
    }
  );

  const data = await response.json();

  alert(data.message);
}

async function login() {

  const response = await fetch(
    `${API}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({

        email:
          document.getElementById(
            "loginEmail"
          ).value,

        password:
          document.getElementById(
            "loginPassword"
          ).value
      })
    }
  );

  const data = await response.json();

  if (data.token) {

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "userRole",
      data.user.role
    );

    if (data.user.role === "admin") {

      window.location.href =
        "admin.html";

    } else {

      window.location.href =
        "dashboard.html";

    }
  }

  alert(data.message);
}

function logout() {

  localStorage.removeItem("token");

  localStorage.removeItem(
    "userRole"
  );

  window.location.href =
    "index.html";
}
