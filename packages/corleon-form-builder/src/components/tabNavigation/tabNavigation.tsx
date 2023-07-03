import React from 'react'

interface ITabNavigation {
    tabs: { [name: string]: React.ReactNode };
    defaultTab: keyof this["tabs"]
}
const TabNavigation = ({ tabs, defaultTab }: ITabNavigation) => {
    const [activeTab, setActiveTab] = React.useState<string | number>(defaultTab);

    return (
        <React.Fragment>
            <div className='field-setting-navbar'>
                {Object.entries(tabs).filter(([, value]) => !!value).map(([key]) =>
                    <button key={key} type='button' onClick={() => setActiveTab(key)} className={`${activeTab == key ? "active" : ""}`}>{key}</button>
                )}
            </div>
            <div className='field-setting-content'>
                {tabs[activeTab]}
            </div>
        </React.Fragment>
    )
}

export default TabNavigation