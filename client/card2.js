/*
Name : Aung Pyae Phyo
Class : DIT/1B/09
Admin No. : 2329581
*/

// used to style and define the webcomponent
const template = document.createElement('template');

template.innerHTML = /*html*/`
<style>
    :host {
        display: block;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        text-align: left;
        padding: 10px;
        border: 2px dotted black;
        border-radius: 10px;
        background-color: #3B7EC4;
    }

    #container {
        display: flex; 
        justify-content: space-between;     /* align the items in main space between */
        align-items: center;        /* use align-items-center because of flex box */
    }

    #info {
        display: flex;      /* flexbox layout */
        flex-direction: column;         /* arrange the contents in columns */
        margin-bottom: 10px;
    }

    #head {
        font-size: 2rem;
        font-weight : bold; 
        padding: 5px;
    }

    #body {
        display: inline-flex;       /* only takes needed space*/
        background-color: rgb(188, 188, 188);
        padding: 10px;
        border-radius: 10px;
    }

    #last {
        margin-left : 10px;
        font-size: 40px;
        font-weight: bolder;
        color : white;
    }
</style>

<div id="container">
    <div id="info">
        <div id="head"><span id="school">school</span></div>
        <div id="body"><span id="degree">degree</span></div>
    </div>
    <div id="last"><span id="rate">number rate</span></div>
</div>
`;

class DataCard2 extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'closed' });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
    }

    // define attributes needed
    static get observedAttributes() {
        return ['school','degree','rate'];
    }

    // link attributes to properties 
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

    get rate() {
        return this.getAttribute('rate');
    }
    set rate(value) {
        this.setAttribute('rate', value);
    }


    // handle attribute updates
    attributeChangedCallback(attrName, oldValue, newValue) {
        attrName = attrName.toLowerCase();
        let element;

        switch (attrName) {
            case 'school' :
                element = this.root.querySelector('#school');
                element.textContent = newValue;
            break; 
            case 'degree' :
                element = this.root.querySelector('#degree');
                element.textContent = newValue;
            break;
            case 'rate' :
                element = this.root.querySelector('#rate');
                element.textContent = newValue;
            break;       
        }
    }
}

window.customElements.define('data-card-2', DataCard2);