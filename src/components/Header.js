import React from 'react';

class Header extends React.Component {
    state = {
        searchInput: ''
    }

    onInputChange = e => {
        this.setState({ searchInput: e.target.value });
        this.props.handleInputChange(e.target.value);
    }

    toggleMenu = () => {
        let menu = this.refs.sourcesMenu;
        if (menu.className === 'SourcesMenu') {
            menu.className = 'HiddenElement';
        } else {
            menu.className = 'SourcesMenu';
        }
    }

    render() {
        return (
            <div className="HeaderContainer">
                <header>
                    <nav className="HeaderNavbar">
                        {
                            this.props.sources.map((source, index) => (
                                <button 
                                    className='SourceButton' 
                                    key={index} 
                                    onClick={() => this.props.redirectSource(index)}
                                >
                                    {source.name}
                                </button>
                            ))
                        }
                        <button onClick={this.toggleMenu} className="ToggleMenuButton">Sources</button>
                    </nav>
                    <input
                        className='SearchInput'
                        value={this.state.searchInput}
                        onChange={e => this.onInputChange(e)}
                        type="text"
                        placeholder="Search" />
                    <button onClick={e => this.props.toggleForm(e)} className='ContactButton'>CONTACT US</button>
                </header>
                
                <div ref='sourcesMenu' className="SourcesMenu">
                    {
                        this.props.sources.map((source, index) => (
                            <button 
                                className='SourceMenuButton' 
                                key={index} 
                                onClick={() => this.props.redirectSource(index)}
                            >
                                {source.name}
                            </button>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Header;