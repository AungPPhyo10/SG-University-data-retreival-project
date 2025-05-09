/*
Name : Aung Pyae Phyo
Class : DIT/1B/09
Admin No. : 2329581
*/

// used to style and define the webcomponent
const template = document.createElement('template');

template.innerHTML = /*html*/ `
<style>
    :host {
        display: block;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        background-color: rgb(206, 245, 229);
        border: 2px solid black;
        border-radius: 10px;
        text-align: center;
        padding: 5px;
        height : 360px;
    }

    div#header {
        margin: 5px;
        background-color: #f8f9fa;
        border-radius: 10px;
        font-size: 24px;
        font-weight: bold;
        height: auto;
        padding: 5px;
    }

    div#body {
        padding: 20px;
    }

    span.school_name {
        padding: 8px 16px;
        margin-top: 10px;
        background-color: #00b3b3;
        color: #fff;
        border-radius: 5px;
    }

    div.bordered {
        font-weight: bold;
        padding: 10px;
        border: 4px dashed #B30000;
        border-right: 0;
        border-left: 0;
        margin-top: 20px;
    }

    div.salary {
        font-size: 36px;
        font-weight: bold;
        color: #09005e;
        margin-top: 20px;
    }
</style>
<div id="header" class="text-center"><span id="uni_name">University Name</span></div>
<div id="body">
    <span class="school_name"><span id="school">School Name</span></span>
    <div class="bordered"><span id="degree">Degree</span></div>
    <div class="salary">$<span id="median_salary">SALARY</span></div>
</div>
`;

class DataCard1 extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({
            mode: 'closed'
        });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
    }

    // define attributes needed
    static get observedAttributes() {
        return ['uni_name', 'school', 'degree', 'median_salary'];
    }

    // link attributes to properties
    get uni_name() {
        return this.getAttribute('uni_name');
    }
    set uni_name(value) {
        this.setAttribute('uni_name', value);
    }

    get school() {
        return this.getAttribute('school');
    }
    set school(value) {
        this.setAttribute('school', value);
    }

    get degree() {
        return this.getAttribute('degree');
    }
    set degree(value) {
        this.setAttribute('degree', value);
    }

    get median_salary() {
        return this.getAttribute('median_salary');
    }
    set median_salary(value) {
        this.setAttribute('median_salary', value);
    }

    // handle attribute updates
    attributeChangedCallback(attrName, oldValue, newValue) {
        attrName = attrName.toLowerCase();
        let element;

        switch (attrName) {
            case 'uni_name':
                element = this.root.querySelector('#uni_name');
                element.textContent = newValue;
                break;
            case 'school':
                element = this.root.querySelector('#school');
                element.textContent = newValue;
                break;
            case 'degree':
                element = this.root.querySelector('#degree');
                element.textContent = newValue;
                break;
            case 'median_salary':
                element = this.root.querySelector('#median_salary');
                element.textContent = newValue;
                break;
        }
    }
}

window.customElements.define('data-card-1', DataCard1);