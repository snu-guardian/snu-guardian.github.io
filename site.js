const loadFragment = (path, targetId, label) =>
  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      const target = document.getElementById(targetId)
      if (target) target.innerHTML = html
    })
    .catch((err) => console.error(`${label} load error:`, err))

const loadSeminars = () =>
  fetch("seminars.json")
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById("seminar-list")
      if (!list || !data || !Array.isArray(data.seminars)) return
      data.seminars.forEach((item) => {
        const card = document.createElement("div")
        card.className = `seminar${item.active ? "" : " inactive"}`

        const title = document.createElement("h3")
        title.textContent = item.title

        const time = document.createElement("time")
        time.textContent = item.time

        const desc = document.createElement("p")
        desc.textContent = item.description

        card.append(title, time, desc)
        list.appendChild(card)
      })
    })
    .catch((err) => console.error("Seminar load error:", err))

document.addEventListener("DOMContentLoaded", () => {
  loadFragment("navbar.html", "navbar-placeholder", "Navbar")
  loadFragment("footer.html", "footer-placeholder", "Footer")
  loadSeminars()
})
