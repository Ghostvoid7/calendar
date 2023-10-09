
function Month(value, great_year) {
    this.month_value = value
    switch (this.month_value) {
        case 0:
            this.month_ru = "Январь"
            this.month_ua = "Січень"
            this.month_en = "January"
            this.count_day = 31
            break
        case 1:
            this.month_ru = "Февраль"
            this.month_ua = "Лютий"
            this.month_en = "February"
            if (great_year === true)
                this.count_day = 29
            else
                this.count_day = 28
            break
        case 2:
            this.month_ru = "Март"
            this.month_ua = "Березень"
            this.month_en = "March"
            this.count_day = 31
            break
        case 3:
            this.month_ru = "Апрель"
            this.month_ua = "Квітень"
            this.month_en = "April"
            this.count_day = 30
            break
        case 4:
            this.month_ru = "Май"
            this.month_ua = "Травень"
            this.month_en = "May"
            this.count_day = 31
            break
        case 5:
            this.month_ru = "Июнь"
            this.month_ua = "Червень"
            this.month_en = "June"
            this.count_day = 30
            break
        case 6:
            this.month_ru = "Июль"
            this.month_ua = "Липень"
            this.month_en = "July"
            this.count_day = 31
            break
        case 7:
            this.month_ru = "Август"
            this.month_ua = "Серпень"
            this.month_en = "August"
            this.count_day = 31
            break
        case 8:
            this.month_ru = "Сентябрь"
            this.month_ua = "Вересень"
            this.month_en = "September"
            this.count_day = 30
            break
        case 9:
            this.month_ru = "Октябрь"
            this.month_ua = "Жовтень"
            this.month_en = "October"
            this.count_day = 31
            break
        case 10:
            this.month_ru = "Ноябрь"
            this.month_ua = "Листопад"
            this.month_en = "November"
            this.count_day = 30
            break
        case 11:
            this.month_ru = "Декабрь"
            this.month_ua = "Грудень"
            this.month_en = "December"
            this.count_day = 31
            break
    }
}

function Year(value) {
    this.year_value = value
    this.great_year = (this.year_value % 4 === 0 && this.year_value % 100 !== 0) || this.year_value % 400 === 0;
}

function Created_date (date) {
    this.second_year = new Year(date.getFullYear())
    this.second_month = new Month(date.getMonth(), this.second_year.great_year)
    this.second_date = new Date(date.getFullYear(), date.getMonth(), 1)
    this.second_day = date.getDate()

    if (this.second_month.month_value === 0) {
        this.first_year = new Year(this.second_year.year_value - 1)
        this.first_month = new Month(11, this.first_year.great_year)
    }
    else {
        this.first_year = new Year(this.second_year.year_value)
        this.first_month = new Month(this.second_month.month_value - 1, this.first_year.great_year)
    }
    this.first_date = new Date(this.first_year.year_value, this.first_month.month_value, 1)

    if (this.second_month.month_value === 11) {
        this.third_year = new Year(this.second_year.year_value + 1)
        this.third_month = new Month(0, this.third_year.great_year)
    }
    else {
        this.third_year = new Year(this.second_year.year_value)
        this.third_month = new Month(this.second_month.month_value + 1 , this.third_year.great_year)
    }

    this.third_date = new Date(this.third_year.year_value, this.third_month.month_value, 1)
}

function getWeek(year, connect, some_date, month) {
    let one_date = new Date(year.year_value, 0, 1)
    let index_day;
    if (one_date.getDay() === 0)
        index_day = 7
    else
        index_day = one_date.getDay()

    let num_week = Math.ceil(((some_date - one_date) /1000 /3600 /24 /7) + index_day / 7 )
    if (one_date.getDay() === 5 || one_date.getDay() === 6 || one_date.getDay() === 0) {
        num_week -= 1
    }
    const con_week = connect.querySelector('.week-numbers')
    for (let i = 0; i < 5; i++) {
        con_week.children[i].textContent = ''
    }
    if (some_date.getDay() === 1 && month.count_day === 28) {
        for (let i = 0; i < 4; i++) {
            con_week.children[i].textContent = String(num_week + i)
        }
    }
    else {
        let day = new Date(year.year_value, month.month_value, 31)
        for (let i = 0; i < 5; i++) {
            if (month.month_value === 11 && i === 4) {
                if (con_week.children[i-1].textContent === String(52) && (day.getDay() !== 0 && day.getDay() < 4)) {
                    con_week.children[i].textContent = '1'
                    break
                }
                else {
                    con_week.children[i].textContent = String(num_week + i)
                }
            }
            if ((one_date.getDay() === 5 && i === 0) && month.month_value === 0) {
                con_week.children[i].textContent = '53'
            }
            else {
                con_week.children[i].textContent = String(num_week + i)
            }
        }
    }
}

function add_dates(date, month, year, connect) {
    const removeAll = connect.querySelectorAll('.day-week-numbers')
    for (let i of removeAll) {
        for (let a = 0; a < 5; a++) {
            i.children[a].textContent = ''
        }
    }
    let fraction_1 = month.count_day === 31 && (date.getDay() === 6);
    let fraction_2 = (month.count_day === 30 || month.count_day === 31) && date.getDay() === 0;
    let number_week = 0
    let new_date;

    if (fraction_1 === true) {
        new_date = new Date(year.year_value, month.month_value, 3)
        for (let i = 3; i <= month.count_day; i++) {
            let some_date = new Date(year.year_value, month.month_value, i)
            let some_day = some_date.getDay()
            let div_week = connect.querySelector(dict_week_day[some_day])
            if (i === 8) {
                div_week.children[number_week].textContent = '1/' + i
                continue
            }
            if (i === 9) {
                div_week.children[number_week].textContent = '2/' + i
                number_week += 1
                continue
            }
            div_week.children[number_week].textContent = String(some_date.getDate())
            if (some_day === 0)
                number_week += 1
        }
    }

    if (fraction_2 === true) {
        new_date = new Date(year.year_value, month.month_value, 2)
        for (let i = 2; i <= month.count_day; i++) {
            let some_date = new Date(year.year_value, month.month_value, i)
            let some_day = some_date.getDay()
            let div_week = connect.querySelector(dict_week_day[some_day])
            if (i === 8) {
                div_week.children[number_week].textContent = '1/' + i
                number_week += 1
                continue
            }
            div_week.children[number_week].textContent = String(some_date.getDate())
            if (some_day === 0)
                number_week += 1
        }
    }
    if (fraction_2 === false && fraction_1 === false) {
        new_date = new Date(year.year_value, month.month_value, 1)
        for (let i = 1; i <= month.count_day; i++) {
            let some_date = new Date(year.year_value, month.month_value, i)
            let some_day = some_date.getDay()
            let div_week = connect.querySelector(dict_week_day[some_day])
            div_week.children[number_week].textContent = String(some_date.getDate())
            if (some_day === 0)
                number_week += 1
        }
    }
    getWeek(year, connect, new_date, month)
}

function add_data(year1, month1, year3, month3) {
    const div_head_1 = div_main_1.querySelector('.div-head')
    const div_head_3 = div_main_3.querySelector('.div-head')
    div_head_1.querySelector('.year').textContent = year1.year_value
    div_head_1.querySelector('.month-ru').textContent = month1.month_ru
    div_head_1.querySelector('.month-ua').textContent = month1.month_ua
    div_head_1.querySelector('.month-en').textContent = month1.month_en
    div_head_3.querySelector('.year').textContent = year3.year_value
    div_head_3.querySelector('.month-ru').textContent = month3.month_ru
    div_head_3.querySelector('.month-ua').textContent = month3.month_ua
    div_head_3.querySelector('.month-en').textContent = month3.month_en
}

function checked_date(month, year) {
    let new_year = new Year(year)
    let new_month = new Month(month, new_year.great_year)
    let new_day;
    for (let day_number of day_numbers) {
        for(let i = 0; i < 5; i++) {
            if (day_number.children[i].classList.contains('selected-day')) {
                if (day_number.children[i].textContent === '1/8' || day_number.children[i].textContent === '2/9') {
                    if (day_number.children[i].textContent === '1/8') {
                        new_day = 1
                    }
                    else {
                        new_day = 2
                    }
                }
                else {
                    new_day = Number(day_number.children[i].textContent)
                }
            }
        }
    }
    if (new_day > new_month.count_day) {
        new_day = 1
    }
    return (new_day)
}

function main_init() {
    let now = new Date()

    const first = new Created_date(now)

    for (let i = 1970; i <= 2035; i++) {
        let year_option = document.createElement('option')
        year_option.value = String(i)
        year_option.textContent = String(i)
        if (i === first.second_year.year_value) {
            year_option.selected = true
        }
        sel_year.append(year_option)
    }

    for (let i = 0; i < 12; i++) {
        let month_option = document.createElement('option')
        month_option.value = String(i)
        month_option.textContent = new Month(i).month_ru
        if (i === first.second_month.month_value) {
            month_option.selected = true
        }
        sel_month_ru.append(month_option)
    }

    for (let i = 0; i < 12; i++) {
        let month_option = document.createElement('option')
        month_option.value = String(i)
        month_option.textContent = new Month(i).month_ua
        if (i === first.second_month.month_value) {
            month_option.selected = true
        }
        sel_month_ua.append(month_option)
    }

    for (let i = 0; i < 12; i++) {
        let month_option = document.createElement('option')
        month_option.value = String(i)
        month_option.textContent = new Month(i).month_en
        if (i === first.second_month.month_value) {
            month_option.selected = true
        }
        sel_month_en.append(month_option)
    }

    add_dates(first.second_date, first.second_month, first.second_year, div_main_2)
    add_dates(first.first_date, first.first_month, first.first_year, div_main_1)
    add_dates(first.third_date, first.third_month, first.third_year, div_main_3)

    add_data(first.first_year, first.first_month, first.third_year, first.third_month)

    let fraction_1 = first.second_month.count_day === 31 && (first.second_date.getDay() === 6);
    let fraction_2 = (first.second_month.count_day === 30 || first.second_month.count_day === 31) && first.second_date.getDay() === 0;

    for (let day_number of day_numbers) {
        for(let i = 0; i < 5; i++) {
            if (Number(day_number.children[i].textContent) === false) {
                if ((fraction_1 === true || fraction_2 === true) && (first.second_day === 1 || first.second_day === 8)) {
                    for (let day_number of day_numbers) {
                        for (let i = 0; i < 5; i++) {
                            if (day_number.children[i].textContent === '1/8') {
                                day_number.children[i].classList.add('selected-day')
                            }
                        }
                    }
                }
                if (fraction_1 === true && (first.second_day === 2 || first.second_day === 9)) {
                    for (let day_number of day_numbers) {
                        for(let i = 0; i < 5; i++) {
                            if (day_number.children[i].textContent === '2/9') {
                                day_number.children[i].classList.add('selected-day')
                            }
                        }
                    }
                }
            }
            else {
                if (day_number.children[i].textContent === String(first.second_day)) {
                    day_number.children[i].classList.add('selected-day')
                }
            }
        }
    }
}

function change_init(user_date) {

    const changed = new Created_date(user_date)

    add_dates(changed.second_date, changed.second_month, changed.second_year, div_main_2)
    add_dates(changed.first_date, changed.first_month, changed.first_year, div_main_1)
    add_dates(changed.third_date, changed.third_month, changed.third_year, div_main_3)

    add_data(changed.first_year, changed.first_month, changed.third_year, changed.third_month)

    for (let day_number of day_numbers) {
        for(let i = 0; i < 5; i++) {
            if (day_number.children[i].classList.contains('selected-day')) {
                day_number.children[i].classList.remove('selected-day')
            }
        }
    }

    if (Number(changed.second_month.count_day) < Number(changed.second_day)) {
        changed.second_day = '1'
    }
    for (let day_number of day_numbers) {
        for(let i = 0; i < 5; i++) {
            if (day_number.children[i].textContent === '1/8' || day_number.children[i].textContent === '2/9') {
                if (day_number.children[i].textContent === '1/8' && (changed.second_day === 1 || changed.second_day === 8)) {
                    day_number.children[i].classList.add('selected-day')
                }
                if (day_number.children[i].textContent === '2/9' && (changed.second_day === 2 || changed.second_day === 9)) {
                    day_number.children[i].classList.add('selected-day')
                }
            }
            else {
                if (day_number.children[i].textContent === String(changed.second_day)) {
                    day_number.children[i].classList.add('selected-day')
                    break
                }
            }
        }
    }

}

const div_main_2 = document.querySelector(".div-main-2")
const div_main_1 = document.querySelector(".div-main-1")
const div_main_3 = document.querySelector(".div-main-3")
const day_numbers = div_main_2.querySelectorAll('.day-week-numbers')

const sel_year = div_main_2.querySelector('.sel-year')
const sel_month_ru = div_main_2.querySelector('.sel-month-ru')
const sel_month_ua = div_main_2.querySelector('.sel-month-ua')
const sel_month_en = div_main_2.querySelector('.sel-month-en')


const dict_week_day = {
    0: ".number-7",
    1: ".number-1",
    2: ".number-2",
    3: ".number-3",
    4: ".number-4",
    5: ".number-5",
    6: ".number-6",
}

main_init()

sel_year.addEventListener("change", function(){
    let year = Number(this.value)
    let month_ru = Number(sel_month_ru.value)
    let user_date = new Date(year, month_ru, checked_date(month_ru, year))
    change_init(user_date)
})

sel_month_ru.addEventListener('change', function(){
    let year = Number(sel_year.value)
    let month_ru = Number(this.value)
    let user_date = new Date(year, month_ru, checked_date(month_ru, year))
    change_init(user_date)
    for (let i = 0; i < 12; i++) {
        if (sel_month_ua.children[i].value === String(month_ru)) {
            sel_month_ua.children[i].selected = true
        }
        if (sel_month_en.children[i].value === String(month_ru)) {
            sel_month_en.children[i].selected = true
        }
    }
})

sel_month_ua.addEventListener('change', function(){
    let year = Number(sel_year.value)
    let month_ua = Number(this.value)
    let user_date = new Date(year, month_ua, checked_date(month_ua, year))
    change_init(user_date)
    for (let i = 0; i < 12; i++) {
        if (sel_month_ru.children[i].value === String(month_ua)) {
            sel_month_ru.children[i].selected = true
        }
        if (sel_month_en.children[i].value === String(month_ua)) {
            sel_month_en.children[i].selected = true
        }
    }
})

sel_month_en.addEventListener('change', function(){
    let year = Number(sel_year.value)
    let month_en = Number(this.value)
    let user_date = new Date(year, month_en, checked_date(month_en, year))
    change_init(user_date)
    for (let i = 0; i < 12; i++) {
        if (sel_month_ua.children[i].value === String(month_en)) {
            sel_month_ua.children[i].selected = true
        }
        if (sel_month_ru.children[i].value === String(month_en)) {
            sel_month_ru.children[i].selected = true
        }
    }
})

for (let day_number of day_numbers) {
    for(let i = 0; i < 5; i++) {
        day_number.children[i].addEventListener('click', function () {
            for (let day_number of day_numbers) {
                for(let i = 0; i < 5; i++) {
                    if (day_number.children[i].classList.contains('selected-day')) {
                        day_number.children[i].classList.remove('selected-day')
                    }
                }
            }
            day_number.children[i].classList.add('selected-day')
        })
    }
}












