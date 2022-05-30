import Header from '../components/Header';
import SlideBar from './SlideBar';

function DefaulLayout({ children }) {
    return (
        <div>
            <Header></Header>
            <div className="container">
                <SlideBar></SlideBar>
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaulLayout;
