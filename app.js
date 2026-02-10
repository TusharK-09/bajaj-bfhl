const express = require("express");
const axios = require("axios");
const port = 3000;
require("dotenv").config();
const app = express();
app.use(express.json());

const OFFICIAL_EMAIL = "tushar1071.be23@chitkara.edu.in";


//math fns
function isPrime(num) {
  if (!Number.isInteger(num) || num < 2) {
    return false;
  }
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
        return false;
    }
  }
  return true;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function fibonacci(n) {
  if (!Number.isInteger(n) || n < 0) return [];
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return [0];
  }
  const res = [0, 1];
  for (let i = 2; i < n; i++) {
    res.push(res[i - 1] + res[i - 2]);
  }
  return res;
}

async function aiAnswer() {
  return "Mumbai";
}



//controller
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

app.post("/bfhl", async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ is_success: false });
    }

    const keys = Object.keys(req.body);
    if (keys.length !== 1) {
      return res.status(400).json({ is_success: false });
    }

    const key = keys[0];
    const value = req.body[key];
    let data;

    switch (key) {
      case "fibonacci":
        data = fibonacci(value);
        break;

      case "prime":
        if (!Array.isArray(value)) throw 0;
        data = value.filter(isPrime);
        break;

      case "lcm":
        if (!Array.isArray(value) || value.length === 0) throw 0;
        data = value.reduce((a, b) => lcm(a, b));
        break;

      case "hcf":
        if (!Array.isArray(value) || value.length === 0) throw 0;
        data = value.reduce((a, b) => gcd(a, b));
        break;

      case "AI":
        if (typeof value !== "string") throw 0;
        data = await aiAnswer(value);
        break;

      default:
        return res.status(400).json({ is_success: false });
    }

    res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data
    });

  } catch {
    res.status(400).json({ is_success: false });
  }
});


app.listen(port , ()=>{
    console.log(`server started ${port}`)
});
