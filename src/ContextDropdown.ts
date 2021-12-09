import { Component, IComponentBindings, ComponentOptions, $$, Dom } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface IContextDropdownOptions {
    contextKey: string;
    values: IOption[] | IGroupedOption[];
    isGrouped?: boolean;
    initialChoice?: string;
    triggerSearch?: boolean;
}

export interface IOption {
    label?: string;
    value: string;
}

export interface IGroupedOption {
    name: string;
    options: IOption[];
}

@lazyComponent
export class ContextDropdown extends Component {
    static ID = 'ContextDropdown';
    static options: IContextDropdownOptions = {
        isGrouped: ComponentOptions.buildBooleanOption({ defaultValue: false }),
        triggerSearch: ComponentOptions.buildBooleanOption({ defaultValue: false }),
        contextKey: ComponentOptions.buildStringOption(),
        values: ComponentOptions.buildJsonOption(),
        initialChoice: ComponentOptions.buildStringOption(),
    };

    constructor(public element: HTMLElement, public options: IContextDropdownOptions, public bindings: IComponentBindings) {
        super(element, ContextDropdown.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, ContextDropdown, options);
        if (!Array.isArray(this.options.values)) {
            this.options.values = Object.values(this.options.values) as IOption[] | IGroupedOption[];
        }

        this.bind.onRootElement(Coveo.QueryEvents.doneBuildingQuery, (args: Coveo.IDoneBuildingQueryEventArgs) => this.handleDoneBuildingQuery(args));

        this.render();
    }

    public render() {
        let selectFragment = new DocumentFragment();
        let select = this.createSelect();
        select = this.prepareOptions(select, this.options.values, this.options.isGrouped);
        selectFragment.appendChild(select.el);
        this.element.appendChild(selectFragment);
    }

    protected handleDoneBuildingQuery(args: Coveo.IDoneBuildingQueryEventArgs) {
        const value = this.getSelectedValue();
        args.queryBuilder.addContextValue(this.options.contextKey, value);
    }

    protected getSelectedValue(): string {
        let selectEl = <HTMLSelectElement>(this.element instanceof HTMLSelectElement ? this.element : $$(this.element).find('select'));

        if (!selectEl) {
            selectEl = <HTMLSelectElement>$$('select').el;
            this.element.appendChild(selectEl);
        }

        return selectEl.value;
    }

    protected prepareOptions(select: Dom, options: IOption[] | IGroupedOption[] = [], isGrouped?: boolean): Dom {
        console.log(options)
        if (isGrouped) {
            for (let option of options) {
                option = <IGroupedOption>option;
                select.el.appendChild(this.createOptionGroup(option.name, option.options).el);
            }
        } else {
            for (let option of options) {
                option = <IOption>option;
                select.el.appendChild(this.createOption(option.label, option.value).el);
            }
        }

        return select;
    }

    protected createSelect(): Dom {
        let select = $$('select');
        const changeAction = () => this.handleSelectChange();
        select.on('change', changeAction);
        return select;
    }

    protected handleSelectChange() {
        if (this.options.triggerSearch) {
            this.queryController.executeQuery();
        }
    }

    protected createOption(label: string, value: string | number): Dom {
        let option = $$('option', {value}, label);

        if (this.options.initialChoice === value) {
            (option.el as HTMLOptionElement).selected = true;
        }

        return option;
    }

    protected createOptionGroup(label: string, options: IOption[] = []): Dom {
        let group = $$('optgroup', {label});

        for (let option of options) {
            group.el.appendChild(this.createOption(option.label, option.value).el);
        }

        return group;
    }
}