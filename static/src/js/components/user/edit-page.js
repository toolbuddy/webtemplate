import editPageHTML from 'static/src/pug/components/user/edit-page.pug';
import editPageContentHTML from 'static/src/pug/components/user/edit-page-content.pug';
import { dataI18n, } from 'static/src/js/components/user/data-config.js';
import LanguageUtils from 'models/common/utils/language.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

/**
 * @param {object} opt
 * @return {Promise}
 */


class EditPage {
    constructor ( opt ) {
        if (
            !ValidateUtils.isDomElement( opt.editPageDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId )
        )
            throw new TypeError( 'invalid arguments' );

        this.DOM = {
            editPage: opt.editPageDOM,
        };
        this.config = {
            languageId:    opt.languageId,
            buttonMethod:  opt.buttonMethod,
            dbTable:       opt.dbTable,
            dbTableItemId: opt.id,
        };
        this.dataI18n = opt.dataI18n;
        this.editPageConfig = opt.editPageConfig;
        this.dbData = ( opt.buttonMethod === 'update' ) ? opt.dbData : {};
        this.content = opt.content;
    }

    async renderEditPageWindow () {
        const i18n = dataI18n.editPage;
        classRemove( this.DOM.editPage, 'content__edit-page--hidden' );
        this.DOM.editPage.innerHTML = '';
        this.DOM.editPage.innerHTML += editPageHTML( {
            url:    `${ host }/user/profile`,
            cancel: i18n[ this.config.languageId ].button.cancel,
            check:  i18n[ this.config.languageId ].button.check,
            topic:  `${ i18n[ this.config.languageId ].topic[ this.config.buttonMethod ] }${ this.dataI18n[ this.config.languageId ].topic }`,
        } );
        return {
            info:   this.DOM.editPage.querySelector( '.edit-page__window > .window__form > .form__content > .content__info' ),
            check:   this.DOM.editPage.querySelector( '.edit-page__window > .window__form > .form__button > .button__item--check' ),
            cancel:  this.DOM.editPage.querySelector( '.edit-page__window > .window__form > .form__button > .button__item--cancel' ),
            error:   this.DOM.editPage.querySelector( '.edit-page__window > .window__form > .form__content > .content__error > .error__message' ),
        };
    }

    setTextInput ( editPageConfig, editPageInfoDOM ) {
        const flag = {
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: `${ host }/static/image/icon/tw.png`,
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: `${ host }/static/image/icon/us.png`,
        };
        const languageIds = ( editPageConfig.i18n ) ? LanguageUtils.supportedLanguageId : [ this.config.languageId, ];
        languageIds.forEach( ( languageId ) => {
            const placeholder = this.dataI18n[ languageId ].default[ editPageConfig.dbTableItem ];

            editPageInfoDOM.innerHTML += editPageContentHTML( {
                flag:        ( editPageConfig.i18n ) ? flag[ languageId ] : null,
                value:       ( this.config.buttonMethod === 'update' ) ? this.dbData[ languageId ][ editPageConfig.dbTableItem ] : '',
                placeholder,
                name:        ( editPageConfig.i18n ) ? `${ editPageConfig.dbTableItem }_${ languageId }` : `${ editPageConfig.dbTableItem }`,
                dataType:    editPageConfig.dataType,
                type:        editPageConfig.type,
                dbTableItem: editPageConfig.dbTableItem,
                languageId,
                i18n:        editPageConfig.i18n,
            } );
        } );
    }

    setTimeInput ( editPageInfoDOM ) {
        const timeI18n = dataI18n.time[ this.config.languageId ];
        const valueFrom = ( this.config.buttonMethod === 'update' ) ? this.dbData[ this.config.languageId ].from : null;
        const valueTo = ( this.config.buttonMethod === 'update' ) ? this.dbData[ this.config.languageId ].to : null;

        editPageInfoDOM.innerHTML += editPageContentHTML( {
            from:       timeI18n.from,
            to:         timeI18n.to,
            valueFrom,
            valueTo,
            nameFrom:   'from',
            nameTo:     'to',
            type:       'time',
        } );
    }

    setLocalTopic ( topic, editPageInfoDOM ) {
        editPageInfoDOM.innerHTML += editPageContentHTML( {
            localTopic:   topic,
            type:        'local-topic',
        } );
    }

    setDropdownInput ( editPageConfig, editPageInfoDOM ) {
        const util = editPageConfig.util;

        let value = util.map.indexOf( util.defaultOption );
        if ( this.config.buttonMethod === 'update' )
            value = this.dbData[ this.config.languageId ][ editPageConfig.dbTableItem ];

        const top = util.i18n[ this.config.languageId ][ util.map[ value ] ];

        editPageInfoDOM.innerHTML += editPageContentHTML( {
            top,
            value,
            data:        editPageConfig.dropdownItem,
            name:        `${ this.config.dbTable }_${ editPageConfig.dbTableItem }`,
            dbTableItem: editPageConfig.dbTableItem,
            type:        'dropdown',
        } );

        const dropdownTop = editPageInfoDOM.querySelector( '.input__dropdown > .dropdown__top' );
        const dropdownItems = editPageInfoDOM.querySelectorAll( '.input__dropdown > .dropdown__button > .button__content > .content__item' );
        const dropdownSubmit = editPageInfoDOM.querySelector( '.input__dropdown > .dropdown__button > .button__submit' );
        dropdownTop.addEventListener( 'click', () => {
            classAdd( editPageInfoDOM.querySelector( '.input__dropdown > .dropdown__button' ), 'dropdown__button--active' );
        } );
        dropdownItems.forEach( ( item ) => {
            item.addEventListener( 'click', ( element ) => {
                const newValue = element.target.getAttribute( 'value' );
                dropdownTop.textContent = util.i18n[ this.config.languageId ][ newValue ];
                dropdownSubmit.value = util.map.indexOf( newValue );
                classRemove( editPageInfoDOM.querySelector( '.input__dropdown > .dropdown__button' ), 'dropdown__button--active' );
            } );
        } );
    }

    async setEditPageInputBlock ( editPageInfoDOM ) {
        editPageInfoDOM.innerHTML = '';
        this.editPageConfig.forEach( ( element ) => {
            switch ( element.type ) {
                case 'text':
                    this.setTextInput( element, editPageInfoDOM );
                    break;
                case 'time':
                    this.setTimeInput( editPageInfoDOM );
                    break;
                case 'local-topic':
                    const topic =  this.dataI18n[ this.config.languageId ].localTopic[ element.dbTableItem ];
                    this.setLocalTopic( topic, editPageInfoDOM );
                    break;
                case 'dropdown':
                    this.setDropdownInput( element, editPageInfoDOM );
                    break;
                default:
                    break;
            }
        } );
    }

    async setEditPageDeleteBlock ( editPageInfoDOM ) {
        editPageInfoDOM.innerHTML += editPageContentHTML( {
            localTopic:  this.content,
            type:       'local-topic',
        } );
    }

    setFocus () {
        const input = this.DOM.editPage.getElementsByTagName( 'input' );
        const val   = input[ 0 ].value;
        input[ 0 ].focus();
        input[ 0 ].value = '';
        input[ 0 ].value = val;
    }

    async renderEditPage () {
        const editPageContentDOM = await this.renderEditPageWindow();

        if ( this.config.buttonMethod === 'delete' )
            await this.setEditPageDeleteBlock( editPageContentDOM.info );

        else {
            await this.setEditPageInputBlock( editPageContentDOM.info );
            this.setFocus();
        }

        return editPageContentDOM;
    }
}

/**
 * Return a object about editPage info
 * @param {object} info
 * @return {object}
 */

function editPageType ( info ) {
    const typeObj = {
        text: {
            type:        'text',
            dataType:    info.dataType,
            dbTableItem: info.dbTableItem,
            i18n:        info.i18n,
        },
        time: {
            type: 'time',
        },
        localTopic: {
            type:        'local-topic',
            dbTableItem: info.dbTableItem,
        },
        dropdown: {
            type:         'dropdown',
            util:         info.util,
            dbTableItem:  info.dbTableItem,
            dropdownItem: info.dropdownItem,
        },
    };

    return typeObj[ info.type ];
}

export default EditPage;

export {
    EditPage,
    editPageType,
};
