
# 📘 WebRTC + TypeScript Backend — Complete Notes

---

## 1️⃣ TypeScript Project Setup (Backend)

### Why TypeScript?

* Static typing → fewer runtime bugs
* Better IDE support (autocomplete, refactor)
* Industry standard for Node.js backends

---

### 📦 Installation Steps

```bash
npm install -g typescript
npm install -D typescript tslint
tsc --init
```

---

### 🛠️ Important `tsconfig.json` Settings

```json
{
  "outDir": "./dist",
  "noImplicitReturns": true,
  "noImplicitOverride": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,

  "include": ["./src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### What this gives you:

* `src/` → TypeScript source
* `dist/` → compiled JavaScript
* Strict rules → cleaner production code

---

## 2️⃣ Server Setup for WebRTC Signaling

### ❓ Why a server if WebRTC is P2P?

Because **peers must first discover each other** and exchange connection details.

This first communication is called **signaling**.

---

### 📦 Required Packages

```bash
npm install express socket.io
```

* **Express** → HTTP server
* **Socket.IO** → real-time signaling (SDP, ICE candidates)

---

### 🧠 Signaling Server Responsibilities

* Exchange **SDP offer/answer**
* Exchange **ICE candidates**
* DOES NOT handle audio/video data

---

## 3️⃣ PeerJS (Optional Helper Layer)

PeerJS simplifies WebRTC by abstracting:

* SDP handling
* ICE handling
* Peer discovery

```bash
npm install peer -g
peerjs --port 9000 --key peerjs --path /myapp
```

👉 Internally it still uses:

* WebRTC
* STUN/TURN
* ICE candidates

---

## 4️⃣ What Is WebRTC?

### 🔹 Definition

**WebRTC (Web Real-Time Communication)** enables:

* Audio calls
* Video calls
* Data transfer
  directly between browsers using **UDP**

---

### 🔹 Why UDP?

* Low latency
* Packet loss is acceptable for video/audio
* Faster than TCP

---

## 5️⃣ IP Address Basics (IPv4 vs IPv6)

### IPv4

* 32-bit address → `2^32 ≈ 4.3 billion`
* Example: `192.168.1.1`
* **Limited & exhausted**

### IPv6

* 128-bit address
* Example:

  ```
  2401:4900:a132:96b5:4cf:40c5:b607:30e4
  ```
* Practically unlimited

---

## 6️⃣ Why You Still Get an IPv4 Address Today

From `ipconfig`:

```
IPv4 Address: 10.175.173.247
```

### 🔑 Key Insight

This is a **PRIVATE IP**, not a public one.

---

## 7️⃣ NAT (Network Address Translation)

### 🔹 What NAT Does

* Router has **1 public IP**
* Devices get **private IPs**
* Router maps:

  ```
  Private IP + Port ↔ Public IP + Port
  ```

![Image](https://www.watchguard.com/help/docs/help-center/en-us/Content/en-US/Fireware/configuration_examples/images/NAT_email_topology.jpg)

![Image](https://www.researchgate.net/publication/320322146/figure/fig1/AS%3A548239512018944%401507721893582/Typical-configuration-of-a-home-network-using-NAT.png)

---

### Example

| Device | Private IP  |
| ------ | ----------- |
| Phone  | 192.168.1.2 |
| Laptop | 192.168.1.3 |

Router:

```
Public IP → 103.xx.xx.xx
```

---

## 8️⃣ Static IP vs Dynamic IP

### Static IP

* Fixed
* Needed for servers (Amazon, Flipkart)
* Always reachable

### Dynamic IP

* Changes over time
* Used by home routers
* Cheaper & safer

---

## 9️⃣ WebRTC Connection Hurdles

### ❌ Problem 1

Clients **don’t have public IPs**

### ❌ Problem 2

Clients **don’t know their own public IP**

---

## 🔥 Important Truth

> **WebRTC is NOT purely peer-to-peer**

It needs **servers to establish the connection first**.

---

## 🔄 WebRTC Connection Flow (Big Picture)

![Image](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Connectivity/webrtc-complete-diagram.png)

![Image](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Protocols/webrtc-turn.png)

---

## 1️⃣0️⃣ SDP (Session Description Protocol)

### What SDP Contains

* Media type (audio/video)
* Codec (VP8, VP9, H264)
* Encryption keys
* Transport info

---

### SDP Flow

```
Client A → Offer SDP → Signaling Server
Client B → Answer SDP → Signaling Server
```

Only **after this**, real communication starts.

---

## 1️⃣1️⃣ ICE Candidates

### ICE = Interactive Connectivity Establishment

ICE candidate = **possible way to connect**

* Local IP
* Public IP
* TURN relay

ICE tries:

1. Direct connection
2. STUN-assisted
3. TURN relay (last resort)

---

## 1️⃣2️⃣ STUN Server (Public IP Discovery)

### Role

* Tells client:

  ```
  “Hey, the world sees you as 103.xx.xx.xx:54321”
  ```

### Analogy

> Calling your friend’s father to ask if your friend is home

![Image](https://community.cisco.com/t5/image/serverpage/image-id/175445iD859CC44A9012A49?v=v2)

![Image](https://www.metered.ca/tools/openrelay/assets/images/stun-server-66d31b216429fa6075c338ffa3eaa39b.png)

---

## 1️⃣3️⃣ TURN Server (Firewall Bypass)

### When TURN Is Needed

* Strict NAT
* Firewall blocks UDP
* Corporate networks

### What TURN Does

* Acts as **relay**
* Media flows through TURN

⚠️ Slower + expensive (bandwidth cost)

![Image](https://miro.medium.com/max/1400/1%2Ak9ARIJ9Jfkscjji1SNQ4ig.jpeg)

![Image](https://storage.googleapis.com/100ms-cms-prod/cms/turn_server_usage_6868821b66/turn_server_usage_6868821b66.jpg)

---

## 1️⃣4️⃣ WebRTC Success Rate

| Method | Success |
| ------ | ------- |
| Direct | ~70%    |
| STUN   | ~25%    |
| TURN   | ~5%     |

---

## 1️⃣5️⃣ Group Calls Problem

### Mesh Topology (❌ Bad)

* Each peer connects to every peer
* Bandwidth explodes

```
5 users → 10 connections
```

---

## 1️⃣6️⃣ SFU (Selective Forwarding Unit) ✅

### How SFU Works

* All clients send stream → SFU
* SFU forwards streams to others
* No re-encoding

![Image](https://media2.dev.to/cdn-cgi/image/width%3D800%2Cheight%3D%2Cfit%3Dscale-down%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fgh7d4263pexj9v8tbih0.png)

![Image](https://i.sstatic.net/ECNOM.png)

---

### Why SFU Is Best

* Scales well
* Lower CPU
* Used by:

  * Google Meet
  * Zoom
  * Webex

---

## 🔚 Final Mental Model (One Line)

> **WebRTC = P2P media + Server-assisted connection + NAT traversal magic**

---