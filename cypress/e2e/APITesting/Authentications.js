describe ('authentications', () => {

    it ('basic authentication', () => {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {
                username: 'postman',
                password: 'password'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.be.true;
        })
    })

    it ('basic digest authentication', () => {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth', 
            auth: {
                username: 'postman',
                password: 'password',
                method: 'digest'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.be.true;
        })
    })

    it ('bearer token authentication', () => {
        const token = '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';
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it ('API key auth', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/forecast/daily',
            qs: {
                q: 'Delhi',
                appid: 'fe9c5cddb7e01d747b4611c3fc9eaf2c'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            cy.log(response.body)
        })
    })
})