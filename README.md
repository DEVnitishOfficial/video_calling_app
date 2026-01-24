# 🎥 Video Calling App

## Deep Understanding of WebRTC

---

## 1. What is WebRTC?

**WebRTC (Web Real-Time Communication)** is a technology that enables **real-time peer-to-peer communication** between browsers or devices.

### Key Characteristics

* It is **peer-to-peer (P2P)**

  * Two machines connect **directly** to each other
  * Can also work in **mesh topology** (multiple peers connected to each other)
* Supports:

  * 🎙️ Audio
  * 📹 Video
  * 📦 Arbitrary data (DataChannels)
* Uses **browser APIs**, no plugins required
* Optimized for **low latency** communication

👉 If two machines have browsers, they can exchange audio/video using WebRTC APIs.

---

## 2. WebRTC vs WebSockets (Core Differences)

| Feature            | WebRTC                                   | WebSockets                        |
| ------------------ | ---------------------------------------- | --------------------------------- |
| Communication Type | Peer-to-peer                             | Client ↔ Server                   |
| Protocol           | UDP (mostly)                             | TCP                               |
| Latency            | Very low                                 | Higher                            |
| Reliability        | Best-effort                              | Guaranteed                        |
| Use Cases          | Video calls, voice calls, screen sharing | Chat, notifications, live updates |
| Media Support      | Native (audio/video)                     | Manual handling                   |

---

## 3. How WebSockets Work (Chat App Example)

1. You have:

   * Two React clients
   * One backend server
2. Each client opens a **WebSocket connection to the server**
3. Flow:

   ```
   Client A → Server → Client B
   ```
4. All logic lives in the backend:

   * Message validation
   * Broadcasting
   * Persistence (optional)

### Why WebSockets use TCP?

* Chat messages **must not be lost**
* If 5 messages are sent and 2 are lost → conversation breaks
* TCP guarantees:

  * Ordered delivery
  * No data loss
  * Retransmission

---

## 4. Why WebRTC Uses UDP Instead of TCP

### TCP (Transmission Control Protocol)

* Reliable
* Ordered
* Slower due to:

  * Handshakes
  * Acknowledgements
  * Retransmissions
* Suitable for:

  * Chat
  * File transfer
  * APIs

### UDP (User Datagram Protocol)

* Fast
* No guarantee of delivery
* No retransmission by default
* Suitable for:

  * Video
  * Audio
  * Live streaming

👉 In video calls:

* Missing **1–2 video frames** is acceptable
* Waiting for retransmission is **not acceptable**
* That’s why UDP wins

---

## 5. Does WebRTC Completely Avoid Servers?

❌ **No — this is a very common misunderstanding**

WebRTC avoids servers **for media transfer**, but **not completely**.

### Servers are still required for:

1. **Signaling**
2. **NAT traversal**
3. **Fallback relay (TURN)**

---

## 6. What is Signaling in WebRTC?

**Signaling** is the process of **exchanging connection metadata** between peers.

### Metadata includes:

* IP addresses
* Ports
* Codecs supported
* Encryption keys
* Network candidates

⚠️ WebRTC **does not define how signaling works**

You can use:

* WebSockets
* HTTP
* Socket.IO
* Firebase
* Any custom backend

---

## 7. Behind the Scenes: How Two Peers Connect

Assume:

* Client A → Mumbai
* Client B → Hyderabad

### Steps:

1. Both clients connect to a **signaling server**
2. They exchange:

   * SDP (Session Description Protocol)
   * ICE candidates
3. After discovery:

   * They attempt **direct P2P connection**
4. If direct connection fails:

   * TURN server is used

---

## 8. ICE, STUN, and TURN Explained

![Image](https://blog.ivrpowers.com/postimages/technologies/ivrpowers-turn-stun-screen.005.jpeg)

![Image](https://www.researchgate.net/publication/376598006/figure/fig1/AS%3A11431281229598544%401710542612949/Working-of-Signalling-Server-for-NAT-traversal-In-essence-NAT-traversal-in-WebRTC-is.png)

### 🔹 ICE (Interactive Connectivity Establishment)

* A framework
* Tries **all possible network paths**
* Chooses the best route for communication

---

### 🔹 STUN Server (Session Traversal Utilities for NAT)

* Helps a client discover:

  * Its **public IP**
  * NAT type
* Used to attempt **direct peer-to-peer connection**
* Lightweight and fast

Example:

```text
Client → STUN → “Your public IP is X”
```

---

### 🔹 TURN Server (Traversal Using Relays around NAT)

* Used **only when direct P2P fails**
* Acts as a **relay**
* Media flows like:

  ```
  Client A → TURN → Client B
  ```
* Slower than P2P
* Expensive (bandwidth-heavy)

👉 TURN is a **fallback**, not default

---

## 9. Why Direct Connection Sometimes Fails

Direct WebRTC connection fails due to:

* Symmetric NAT
* Corporate firewalls
* Restricted networks
* Different ISPs with strict NAT rules

In such cases:
➡️ TURN server becomes mandatory

---

## 10. Do We Need to Write Our Own TURN Server?

❌ No

You can use:

* Public TURN servers (for testing)
* Managed services (Twilio, Xirsys)
* Open-source TURN servers (coturn)

Example reference you shared:

```
https://gist.github.com/sagivo/3a4b2f2c7ac6e1b5267c2f1f59ac6c6b
```

---

## 11. Complete WebRTC Flow (End-to-End)

```
Client A              Signaling Server              Client B
   |                        |                          |
   | ---- offer (SDP) ----> | ---- offer (SDP) ---->  |
   | <--- answer (SDP) ---- | <--- answer (SDP) ----  |
   | ---- ICE candidates ---------------------------->|
   | <--- ICE candidates -----------------------------|
   |============= Direct P2P Media (UDP) ==============|
              (TURN used only if needed)
```

---

## 12. Summary

* WebRTC = **low-latency P2P communication**
* WebSockets = **reliable client-server messaging**
* WebRTC:

  * Uses UDP
  * Needs signaling
  * Uses STUN + TURN
* TURN is fallback, not default
* Media does **not** flow through your backend

