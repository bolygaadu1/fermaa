import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Printer, 
  Users, 
  Award, 
  Clock, 
  CheckCircle, 
  Star,
  MapPin,
  Phone,
  Mail,
  Target,
  Eye,
  Heart
} from 'lucide-react';

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-xerox-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              About Aishwarya Xerox
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for professional printing and copying services. 
              We've been serving the community with quality, speed, and reliability.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-base sm:text-lg">
                  Aishwarya Xerox was founded with a simple mission: to provide high-quality, 
                  affordable printing services to students, professionals, and businesses in our community.
                </p>
                <p className="text-base sm:text-lg">
                  Located conveniently on ADB road near Pragati Engineering College in Ramesampeta, 
                  Surampalem, we have become the go-to destination for all printing and binding needs.
                </p>
                <p className="text-base sm:text-lg">
                  Our commitment to excellence, combined with modern technology and personalized service, 
                  has made us a trusted name in the printing industry.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="/images/main.jpg" 
                alt="Aishwarya Xerox"
                className="rounded-lg shadow-lg w-full max-w-md h-[300px] sm:h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-xerox-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-xerox-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide exceptional printing and copying services that exceed customer expectations 
                while maintaining affordable pricing and quick turnaround times.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-xerox-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-xerox-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading printing service provider in our region, known for innovation, 
                quality, and customer satisfaction.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-xerox-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-xerox-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Quality, integrity, customer focus, and continuous improvement are at the heart 
                of everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Choose Aishwarya Xerox?</h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-600">
              Here's what sets us apart from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-xerox-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-xerox-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Fast Service</h3>
              <p className="text-sm text-gray-600">
                Quick turnaround times without compromising on quality
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-xerox-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-xerox-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">High Quality</h3>
              <p className="text-sm text-gray-600">
                Professional-grade printing with crisp, clear results
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-xerox-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-xerox-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Affordable Prices</h3>
              <p className="text-sm text-gray-600">
                Competitive pricing that fits your budget
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-xerox-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-xerox-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Expert Support</h3>
              <p className="text-sm text-gray-600">
                Friendly, knowledgeable staff ready to help
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-600">
              Comprehensive printing solutions for all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Printer className="h-8 w-8 text-xerox-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Printing Services</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Black & White Printing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Color Printing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Single & Double-sided Printing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Multiple Paper Sizes (A4, A3, Letter, Legal)
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-xerox-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Binding Services</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Spiral Binding
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Soft Binding
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Project Binding
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Custom Binding Solutions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Visit Us Today</h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-600">
              We're here to help with all your printing needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-xerox-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-xerox-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600 text-sm">
                ADB road near pragati engineering college<br />
                ramesampeta, surampalem
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-xerox-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-xerox-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">
                <a href="tel:+916301526803" className="hover:text-xerox-600 transition-colors">
                  +91 6301526803
                </a>
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-xerox-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-xerox-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">
                <a href="mailto:aishwaryaxerox1999@gmail.com" className="hover:text-xerox-600 transition-colors break-all">
                  aishwaryaxerox1999@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 sm:py-16 bg-xerox-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8">
            Experience the difference with Aishwarya Xerox. Place your order today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-xerox-800 w-full sm:w-auto">
                Place an Order
              </Button>
            </Link>
            <Link to="/track">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-xerox-800 w-full sm:w-auto">
                Track Your Order
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;