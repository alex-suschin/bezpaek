document.querySelectorAll(".js-auth-questions").forEach(function(e) {
    var s, t, a = e.dataset.questions,
        i = e.getAttribute("method") || "GET",
        c = e.querySelector("form"),
        n = function(e) {
            return new Function("data", "var output=" + JSON.stringify(e).replace(/<%=(.+?)%>/g, '"+($1)+"').replace(/<%(.+?)%>/g, '";$1\noutput+="') + ";return output;")
        }(e.querySelector(".js-auth-questions-pool-template").textContent),
        o = e.querySelector(".js-auth-questions-start"),
        u = e.querySelector(".js-auth-questions-pool"),
        r = e.querySelector(".js-auth-questions-pool-list"),
        l = e.querySelector(".js-auth-questions-pool-btn"),
        d = e.querySelector(".js-auth-questions-result"),
        v = e.querySelector(".js-auth-questions-result-success"),
        q = e.querySelector(".js-auth-questions-result-fail"),
        q_total = e.querySelector(".js-auth-questions-result-fail-total"),
        L = e.querySelector(".js-auth-questions-btn-start"),
        h = e.querySelector(".js-auth-questions-btn-resetart"),
        f = e.querySelector(".js-auth-questions-back"),
        y = new XMLHttpRequest,
        S = 0,
        _ = 0;

    function m(e) {
        r.innerHTML = s.questions[e].map(function(e, t) {
            return e.index = t + 1, n(e)
        }).join(""), (t = r.querySelectorAll(".js-auth-questions-item"))[0].classList.add("_active"), f.classList.remove("_active"), t.forEach(function(e) {
            e.querySelectorAll("input").forEach(function(e) {
                e.addEventListener("change", p)
            })
        })
    }

    function p() {
        l.classList.remove("_disabled")
    }

    let listQuestionsNum = 0;

    function resultTest() {
        if(v.classList.contains("_active")) {
            localStorage.setItem('medAuth', true);
        } else {
            listQuestionsNum++;

            if(listQuestionsNum !== 0){l.classList.add("_disabled");}

            if (listQuestionsNum === 3) {
                q.classList.remove("_active");
                q_total.classList.add("_active");
                document.cookie = "authTimeout=true; max-age=86400;";
            }
        }
    }

    function j() {
        _ == s.questions.length - 1 ? (u.classList.remove("_active"), d.classList.add("_active"), (Array.from(t).every(function(e, t) {
            return s.questions[S][t].right == e.querySelector("input:checked").value
        }) ? v : q).classList.add("_active"), resultTest(), f.classList.remove("_active")) : (E(++_), f.classList.add("_active")), t[_].querySelector("input:checked") || l.classList.add("_disabled")
    }

    function g() {
        0 != _ && E(--_), l.classList.remove("_disabled"), 0 == _ ? f.classList.remove("_active") : f.classList.add("_active")
    }

    function E(s) {
        t.forEach(function(e, t) {
            s == t ? e.classList.add("_active") : e.classList.remove("_active")
        })
    }

    function b() {
        _ = 0, S == s.questions.length - 1 ? S = 0 : S++, m(S), u.classList.add("_active"), d.classList.remove("_active"), v.classList.remove("_active"), q.classList.remove("_active"), c.reset()
    }

    function k() {
        o.classList.remove("_active"), u.classList.add("_active")
    }! function(e) {
        y.open(i, e, !0), y.send(), y.onreadystatechange = function() {
            4 == y.readyState && (200 != y.status ? console.log(y.status + ": " + y.statusText) : (s = JSON.parse(y.responseText), m(S), L.addEventListener("click", k), h.addEventListener("click", b), l.addEventListener("click", j), f.addEventListener("click", g)))
        }
    }(a)
});