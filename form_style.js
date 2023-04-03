const steps = document.querySelectorAll('.number')
const next = document.querySelector('#next')
const back = document.querySelector('#back')
const title = document.querySelector('#title')
const reference = document.querySelector('#reference')
const content = document.querySelector('.content-box')

const titles = [
    'Personal Info',
    'Select Your Plan',
    'Pick adds-on',
    'Finishing up'
]
const references = [
    'please provide your name, email address, and phone number',
    'You have the option of monthly or yearly billing',
    'Add-ons help enhance your gaming experience',
    'Double-check everything looks OK before confirming'
]
let counter = 0;
let contentSlider = 1
let stepActive = 0
title.innerText = titles[counter]
reference.innerText = references[counter]
steps[stepActive].classList.toggle('interacted-step')
const stepActived = isNext => {
    if (isNext) {
        if (stepActive < steps.length - 1) {
            stepActive++
            steps[stepActive - 1].classList.toggle('interacted-step')
            steps[stepActive].classList.toggle('interacted-step')
        }
    } else {
        if (stepActive > 0) {
            stepActive--
            steps[stepActive + 1].classList.toggle('interacted-step')
            steps[stepActive].classList.toggle('interacted-step')
        }
    }
}
const slider = increased => {
    increased++
    title.innerText = titles[increased]
    reference.innerText = references[increased]

}
const userName = document.querySelector('#name')
const userMail = document.querySelector('#email')
const userPhone = document.querySelector('#phone')

const intro = document.querySelector('.intro')

const data = {
    name: function () {
        return userName.value
    },
    typeChosedInfo: {},
    serviceTypeInfo: [],
    duration: null,
    user: {
        mail: function () {
            return userMail.value
        },
        phone: function () {
            return userPhone.value
        }
    }
}

const gameType = document.querySelectorAll('.plan-box .each')
let typeChosedInfo = {}
for (let each of gameType) {
    each.addEventListener('click', function () {
        data.typeChosedInfo.type = this.children[1].innerText
        data.typeChosedInfo.price = this.children[2].innerText

        this.classList.toggle('clicked')
    })
}

const service = document.querySelectorAll('.service-box')
let serviceTypeInfo = {}
for (let each of service) {
    each.addEventListener('click', function () {
        data.serviceTypeInfo.push({ service: this.children[1].children[0].innerText, price: this.children[2].innerText })

    })
}


const containers1 = []
const userInfo = document.querySelector('.user-info')
const plan = document.querySelector('.plan-box')
const services = document.querySelector('.services')
const summary = document.querySelector('.summary')
containers1.push(summary, services, plan, userInfo)
let containers = containers1.reverse()
let num = 0;
plan.classList.toggle('smoke')
services.classList.toggle('smoke')
summary.classList.toggle('smoke')
const gameTypeResult = document.querySelector('.plan-result .gameType')
const gameTypeDuration = document.querySelector('.duration-res')
const priceRes = document.querySelector('.plan-price-result')
const serviceResult = document.querySelector('.service-result')
const total = document.querySelector('.total-calc > .total')
const perDuration = document.querySelector('.total-calc .per-duration')
const result = () => {
    data.name()
    intro.innerText = `Dear ${data.name()}, There is your purchase summary`
    gameTypeDuration.innerText = data.duration
    gameTypeResult.innerText = data.typeChosedInfo.type
    priceRes.innerText = data.typeChosedInfo.price
    if (data.duration.includes('M')) {
        perDuration.innerText = ' /month'
    } else {
        perDuration.innerText = ' /year'
    }
    const length = () => {
        return data.serviceTypeInfo.length
    }
    const prices = []
    for (let i = 0; i < length(); i++) {
        const container = document.createElement('div')
        const title = document.createElement('span')
        const price = document.createElement('span')
        container.classList.add('service-res-container')
        title.innerText = data.serviceTypeInfo[i].service
        price.innerText = data.serviceTypeInfo[i].price
        container.append(title, price)
        serviceResult.append(container)
        prices.push(data.serviceTypeInfo[i].price)
    }
    prices.push(data.typeChosedInfo.price)
    let reg = /\d+/g
    let stringed = prices.toString()
    const validTotalPrice = stringed
        .match(reg)
        .map(x => parseInt(x))
        .reduce((prev, curr) => prev + curr)
    total.innerText = `$${validTotalPrice}`

}
if (num === 0) back.classList.add('smoke')
next.addEventListener('click', function () {
    if (num < containers.length - 1) {
        num++
        containers[num - 1].classList.toggle('smoke')
        containers[num].classList.toggle('smoke')
        if (num > 0) back.classList.remove('smoke')
    }
    stepActived(true)
    if (counter < titles.length - 2) {
        counter++
        slider(counter)
    }
    const confirm = document.createElement('button')
    confirm.innerText = 'Confirm'
    confirm.classList.add('confirm')
    if (num >= 3) this.replaceWith(confirm)
    result()
    confirm.addEventListener('click', function () {
        const header = document.querySelector('.header')
        header.classList.add('smoke')
        summary.classList.add('smoke')
        const final = document.querySelector('.final')
        const userPhone = document.querySelector('.user-number')
        const userEmail = document.querySelector('.user-email')
        const userName = document.querySelector('.user-name')
        userPhone.innerText = data.user.phone()
        userEmail.innerText = data.user.mail()
        userName.innerText = data.name()
        final.classList.toggle('smoke')
        this.remove()
        back.remove()

    })
})

back.addEventListener('click', function () {
    if (num > 0) {
        num--
        containers[num + 1].classList.toggle('smoke')
        containers[num].classList.toggle('smoke')
        if (num === 0) back.classList.add('smoke')
    }
    stepActived(false)
    if (counter >= 0) {
        counter--
        slider(counter)
    }

})

const monthly = document.querySelector('.month-btn')
const yearly = document.querySelector('.year-btn')
const planPrices = document.querySelectorAll('.plan-box .each .price')
const yearlyPrices = ['$90/yr', '$120/yr', '$150/yr']
const monthlyPrices = ['9$/mo', '$12/mo', '$15/mo']
const servicePrices = document.querySelectorAll('.service-price')
const monthlyServicePrices = ['+$1/mo', '+$2/mo', '+$2/mo']
const yearlyServicePrices = ['+$10/yr', '+$20/yr', '+$20/yr']
function addPrices(typePrice, servicePrice) {
    for (let i = 0; i < planPrices.length; i++) {
        planPrices[i].innerText = typePrice[i]
        servicePrices[i].innerText = servicePrice[i]
    }
}
monthly.addEventListener('click', function () {
    this.classList.toggle('clicked')
    if ([...yearly.classList].includes('clicked')) yearly.classList.toggle('clicked')
    addPrices(monthlyPrices, monthlyServicePrices)
    data.duration = '(Monthly)'

})
yearly.addEventListener('click', function () {
    this.classList.toggle('clicked')
    if ([...monthly.classList].includes('clicked')) monthly.classList.toggle('clicked')
    addPrices(yearlyPrices, yearlyServicePrices)
    data.duration = '(Yearly)'
})
