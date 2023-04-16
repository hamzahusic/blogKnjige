import ContactPage from './ContactPage';
import HeroSection from './HeroSection'
import RecentBlogs from './RecentBlogs'
const Home = () => {
    return ( 
        <div className=''>
            <HeroSection/>
            <RecentBlogs/>
            <ContactPage/>
        </div>
     );
}
 
export default Home;