<div align="center">

# JSON ↔ Dart · DevTools

**A lightweight suite of developer tools — built for Flutter developers.**

🌐 **[Try it live → harsh-codeverse.netlify.app](https://harsh-codeverse.netlify.app)**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://harsh-codeverse.netlify.app)

</div>

---

## 🛠️ Tools Included

### 1. JSON → Dart Converter
Paste any JSON and instantly generate production-ready Dart model classes.

- ✅ Null-safe Dart 3.x output
- ✅ `fromJson()` and `toJson()` methods
- ✅ `copyWith()` support
- ✅ Nested JSON → nested model classes
- ✅ One-click copy output

**Input:**
```json
{
  "id": 1,
  "name": "Harsh",
  "address": {
    "city": "Goa",
    "pincode": "403001"
  }
}
```

**Output:**
```dart
class Address {
  final String city;
  final String pincode;

  Address({required this.city, required this.pincode});

  factory Address.fromJson(Map<String, dynamic> json) => Address(
    city: json['city'] as String,
    pincode: json['pincode'] as String,
  );

  Map<String, dynamic> toJson() => {
    'city': city,
    'pincode': pincode,
  };

  Address copyWith({String? city, String? pincode}) => Address(
    city: city ?? this.city,
    pincode: pincode ?? this.pincode,
  );
}

class Root {
  final int id;
  final String name;
  final Address address;

  Root({required this.id, required this.name, required this.address});

  factory Root.fromJson(Map<String, dynamic> json) => Root(
    id: json['id'] as int,
    name: json['name'] as String,
    address: Address.fromJson(json['address']),
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'address': address.toJson(),
  };

  Root copyWith({int? id, String? name, Address? address}) => Root(
    id: id ?? this.id,
    name: name ?? this.name,
    address: address ?? this.address,
  );
}
```

---

### 2. JSON Viewer
Format, visualize, and navigate complex JSON data with a clean tree view. No more squinting at minified JSON responses.

---

### 3. Text Compare
Paste two code snippets or text blocks and see the differences highlighted side by side. Useful for comparing API responses, model versions, or config changes.

---

### 4. JWT Decoder
Paste any JWT token and instantly inspect the header, payload, and signature. No external services — decoded entirely in the browser.

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/harshyadavDeveloper/json_to_dart_converter.git

# Install dependencies
cd json_to_dart_converter
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| React + Vite | UI framework + fast build tooling |
| Tailwind CSS | Utility-first styling |
| Netlify | Deployment + hosting |

---

## 🤝 Contributing

Found a bug or want to add a tool? PRs are welcome.

1. Fork the repo
2. Create a branch — `git checkout -b feat/your-feature`
3. Commit — `git commit -m 'feat: add your feature'`
4. Push — `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — free to use and modify.

---

<div align="center">

Built by [Harsh Yadav](https://github.com/harshyadavDeveloper) · [Portfolio](https://harsh-myportfolio.netlify.app/) · [LinkedIn](https://linkedin.com/in/harsh-yadav-041062254)

</div>
