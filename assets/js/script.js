(function () {
  "use strict";

  /**
   * Mobile nav toggle
   */
  document.addEventListener("DOMContentLoaded", function () {
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    function mobileNavToogle() {
      document.querySelector("body").classList.toggle("mobile-nav-active");
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
    }
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll("#navmenu a").forEach((navmenu) => {
      navmenu.addEventListener("click", () => {
        if (document.querySelector(".mobile-nav-active")) {
          mobileNavToogle();
        }
      });
    });
  });
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Sidebar toggle
   */
  if (select(".toggle-sidebar-btn")) {
    on("click", ".toggle-sidebar-btn", function (e) {
      select("body").classList.toggle("toggle-sidebar");
    });
  }
})();

// treader search table
const demoData = [
  {
    firstName: "John",
    lastName: "Doe",
    fatherName: "Mr. Doe",
    email: "demo@gmail.com",
    cnic: "12345-1234567-1",
    ipAddress: "192.168.1.1:8080",
    mobile: "+923001922811",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    fatherName: "Mr. Smith",
    email: "demo@gmail.com",
    cnic: "23456-2345678-2",
    ipAddress: "192.168.1.2:8080",
    mobile: "+923033145334",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    fatherName: "Mr. Johnson",
    email: "demo@gmail.com",
    cnic: "34567-3456789-3",
    ipAddress: "192.168.1.3:8080",
    mobile: "+923112290870",
  },
  {
    firstName: "Bob",
    lastName: "Brown",
    fatherName: "Mr. Brown",
    email: "demo@gmail.com",
    cnic: "45678-4567890-4",
    ipAddress: "192.168.1.4:8080",
    mobile: "+923017745112",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const traderSearchBtn = document.getElementById("traderSearchBtn");
  const traderSearchInput = document.getElementById("traderSearchInput");
  const traderTableBody = document.getElementById("traderTableBody");

  traderSearchBtn.addEventListener("click", function (e) {
    const filter = traderSearchInput.value.trim();

    if (filter === "") {
      traderTableBody.innerHTML = `<tr>
            <th>ID</th>
            <td>No result found</td>
        </tr>
        <tr>
            <th>First Name</th>
            <td>No result found</td>
        </tr>
        <tr>
            <th>Last Name</th>
            <td>No result found</td>
        </tr>
        <tr>
            <th>Father's Name</th>
            <td>No result found</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>No result found</td>
        </tr>
        <tr>
            <th>Mobile</th>
            <td>No result found</td>
        </tr>
        <tr>
            <th>IP Address</th>
            <td>No result found</td>
        </tr>`;
      return;
    }

    const result = demoData.find((item) => item.cnic.includes(filter));

    traderTableBody.innerHTML = result
      ? `<tr>
            <th>ID</th>
            <td>${result.cnic}</td>
        </tr>
        <tr>
            <th>First Name</th>
            <td>${result.firstName}</td>
        </tr>
        <tr>
            <th>Last Name</th>
            <td>${result.lastName}</td>
        </tr>
        <tr>
            <th>Father's Name</th>
            <td>${result.fatherName}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>${result.email}</td>
        </tr>
        <tr>
            <th>Mobile</th>
            <td>${result.mobile}</td>
        </tr>
        <tr>
            <th>IP Address</th>
            <td>${result.ipAddress}</td>
        </tr>`
      : "<tr  rowspan='5'><td colspan='5'>No results found</td></tr>";

    traderSearchInput.value = "";
  });
});

// brokers table
document.addEventListener("DOMContentLoaded", function () {
  const brokerBtnAdd = document.getElementById("brokerBtnAdd");
  const brokerDataForm = document.getElementById("brokerDataForm");
  const brokerTableBody = document.getElementById("brokerTableBody");
  const brokerBtnReset = document.getElementById("brokerBtnReset");

  brokerBtnAdd.addEventListener("click", function (e) {
    e.preventDefault();

    const data = new FormData(brokerDataForm);
    const isFormComplete = [...data.entries()].every(
      ([key, value]) => value.trim() !== ""
    );

    if (isFormComplete) {
      const cnic = data.get("cnic").trim();
      const mobile = data.get("mobile").trim();
      const vpsNo = data.get("vps-no").trim();
      let fullname = data.get("fullname").trim();
      let fatherName = data.get("fathersname").trim();

      const validCNIC = validFormatCNIC(cnic);
      const validMobile = validFormatMobile(mobile);

      if (validCNIC && validMobile) {
        fullname = capitalizeWords(fullname);
        fatherName = capitalizeWords(fatherName);

        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${fullname}</td>
          <td>Mr.${fatherName}</td>
          <td>${validCNIC}</td>
          <td>+${mobile}</td>
          <td>${data.get("ipaddress")}</td>
          <td>${vpsNo}</td>
      `;
        brokerTableBody.appendChild(row);
        brokerDataForm.reset();
      } else {
        if (!validCNIC) {
          alert(
            `Please enter a valit CNIC in this format 3120245456542 without '-' dashes`
          );
        }
        if (!validMobile) {
          alert(`Please enter a valid mobile in this format 923009080270`);
        }
      }
    } else {
      alert("Please fill in all the fields before adding!");
    }
  });

  function validFormatCNIC(cnic) {
    const cnicPattern = /^\d{13}$/;
    if (cnicPattern.test(cnic)) {
      return `${cnic.slice(0, 5)}-${cnic.slice(5, 12)}-${cnic.slice(12)}`;
    }
    return false;
  }

  function validFormatMobile(mobile) {
    const mobilePattern = /^\923\d{9}$/;
    return mobilePattern.test(mobile);
  }

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  brokerBtnReset.addEventListener("click", function (e) {
    e.preventDefault();
    brokerDataForm.reset();
  });
});

// vps table
document.addEventListener("DOMContentLoaded", function () {
  const vpsAddBtn = document.querySelector("#vpsAddBtn");
  const vpsResetBtn = document.querySelector("#vpsResetBtn");
  const vpsDataForm = document.querySelector("#vpsDataForm");
  const vpsTableBody = document.querySelector("#vpsTableBody");
  const toggleBtns = document.querySelectorAll(".toggleBtn");

  vpsAddBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const data = new FormData(vpsDataForm);
    const isFormComplete = [...data.entries()].every(
      ([key, value]) => value.trim() !== ""
    );

    if (isFormComplete) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.get("machine-name")}</td>
        <td>${data.get("vps-ip")}</td>
        <td>${data.get("credentials")}</td>
        <td>${data.get("spacs")}</td>
        <td>${data.get("port")}</td>
        <td>${data.get("assigned")}</td>
        <td>
          <a
            class="btn btn-danger rounded"
            href="#"
            role="button"
          >
            Inactive
          </a>
        </td>
      `;

      vpsTableBody.appendChild(row);
      vpsDataForm.reset();
    } else {
      alert("Please fill in all the fields before adding!");
    }
  });

  vpsResetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    vpsDataForm.reset();
  });

  toggleBtns.forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const button = this;
      if (button.textContent === "Active") {
        console.log("Inactive");
        button.textContent = "Inactive";
        button.classList.remove("btn-success");
        button.classList.add("btn-danger");
      } else {
        button.textContent = "Active";
        button.classList.remove("btn-danger");
        button.classList.add("btn-success");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const btnLogin = document.getElementById("login-btn");

  const demoUsername = "demo@gmail.com";
  const demoPassword = "12345";

  btnLogin.addEventListener("click", function (e) {
    e.preventDefault();

    if (username.value === demoUsername && password.value === demoPassword) {
      window.location.href = "home.html";
    } else {
      username.value = "";
      password.value = "";
      alert("Invalid Username or Password");
    }
  });
});
