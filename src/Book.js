import React, { Fragment } from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
    ChipField, FileField ,FileInput,
    ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
    Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
    TextField, DateField,ArrayField,SingleFieldList, SelectInput, ShowButton, EditButton, DeleteButton,
    DateInput ,ReferenceInput } from 'react-admin';
    import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';
    import { change } from 'redux-form'

class Book extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            root:[],
            isRender: false
        }
    }

    componentDidMount() {
        let roots = [];
        fetch(process.env.REACT_APP_API_URL+'/categories/allCategories?rowId=0', { method: 'GET', headers: {}})
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            
            for(let cat in myJson.data.data) {
                if(myJson.data.data[cat].parentId === '0') {
                    roots.push(myJson.data.data[cat]);
                }
            }

            this.setState({categories:myJson.data.data,root:roots},() => {
                this.setState({isRender:true})
            });

        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });
    }

    GetSeasons(categoryId){
        let seasons = [];
        for(let season in this.state.categories) {
            if(this.state.categories[season].parentId == categoryId)
                seasons.push(this.state.categories[season]);
        }
        return seasons;
    }

    retVal(obj) {
        let st ='';
        for (let key in obj){
            if(obj.hasOwnProperty(key) && (typeof (obj[key]) != 'function')){
                st += obj[key];
            }
        }
        return st;
    }

    render() {
        let
            book = '',
            season = '',
            section = '',
            part = ''
            ;

        if (typeof(this.props.record.data) !== 'undefined')
            book = this.props.record.data.summary.book;

        if (typeof(this.props.record.data) !== 'undefined')
            season = this.props.record.data.summary.season;

        if (typeof(this.props.record.data) !== 'undefined')
            section = this.props.record.data.summary.section;

        if (typeof(this.props.record.data) !== 'undefined')
            part = this.props.record.data.summary.part;

        return(
            this.state.isRender ?
            <React.Fragment>
                <FormDataConsumer>
                    {({ formData, dispatch, ...rest }) => (
                        <Fragment>
                            <SelectInput
                                source="book"
                                label="book"
                                defaultValue = {book}
                                choices={this.state.root}
                                onChange={
                                    (value) => {
                                        dispatch(
                                            change(REDUX_FORM_NAME, 'data.summary.category', this.retVal(value))
                                        )
                                        dispatch(
                                            change(REDUX_FORM_NAME, 'category', this.retVal(value))
                                        )
                                    }
                                }
                                {...rest}
                            />

                            <SelectInput
                                source="season"
                                label="season"
                                choices={(formData)?this.GetSeasons(formData.book):null}
                                defaultValue = {season}
                                onChange={
                                    (value) => {
                                        dispatch(
                                            change(REDUX_FORM_NAME, 'data.summary.category', this.retVal(value))
                                        )
                                        dispatch(
                                            change(REDUX_FORM_NAME, 'category', this.retVal(value))
                                        )
                                    }
                                }
                                {...rest}
                            />
                            
                            <SelectInput
                                source="section"
                                label="section"
                                defaultValue = {section}
                                choices={(formData)?this.GetSeasons(formData.season):null}
                                onChange={
                                    (value) => {
                                    dispatch(
                                        change(REDUX_FORM_NAME, 'data.summary.category', this.retVal(value))
                                    )
                                    dispatch(
                                        change(REDUX_FORM_NAME, 'category', this.retVal(value))
                                    )
                                    }
                                }
                                {...rest}
                            />
                            
                            <SelectInput
                                source="part"
                                label="part"
                                defaultValue = {part}
                                choices={(formData)?this.GetSeasons(formData.section):null}
                                onChange={
                                    (value) =>{
                                        dispatch(
                                            change(REDUX_FORM_NAME, 'data.summary.category', this.retVal(value))
                                        )
                                        dispatch(
                                            change(REDUX_FORM_NAME, 'category', this.retVal(value))
                                        )
                                    } 
                                    
                                }
                                {...rest}
                            />
                        </Fragment>
                    )}
                </FormDataConsumer>
            </React.Fragment> : null 
        )
    }
}
export default Book;