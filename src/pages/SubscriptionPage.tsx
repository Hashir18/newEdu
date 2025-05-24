import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Check, Shield, CreditCard, Calendar, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';
import subscriptionPlans, { SubscriptionPlan } from '../data/subscriptionData';
import { useAuth } from '../contexts/AuthContext';

const SubscriptionPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    isAuthenticated && user?.subscription ? user.subscription : null
  );
  
  // Filter plans based on billing period
  const filteredPlans = subscriptionPlans.filter(plan => 
    plan.id === 'free' || plan.period === billingPeriod
  );
  
  // FAQ items
  const faqItems = [
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes to your subscription will take effect on your next billing date."
    },
    {
      question: "How does the free plan work?",
      answer: "The free plan gives you basic access to a limited selection of games and activities. It's a great way to try out the platform before committing to a paid subscription."
    },
    {
      question: "Do you offer family plans?",
      answer: "Yes, our Premium and Premium Annual plans include support for multiple child profiles, making them perfect for families with more than one child."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through our payment partner."
    },
    {
      question: "Is there a refund policy?",
      answer: "If you're not satisfied with your subscription, you can request a refund within 7 days of purchase. Contact our support team for assistance."
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="font-nunito font-bold text-4xl md:text-5xl mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Choose Your Learning Adventure
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-primary-100 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Unlock a world of educational content with our flexible subscription plans. Find the perfect option for your child's learning journey.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="inline-flex bg-white/10 rounded-full p-1">
                <button
                  onClick={() => setBillingPeriod('month')}
                  className={`py-2 px-6 rounded-full text-sm transition-colors ${
                    billingPeriod === 'month'
                      ? 'bg-white text-primary-700'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('year')}
                  className={`py-2 px-6 rounded-full text-sm transition-colors flex items-center ${
                    billingPeriod === 'year'
                      ? 'bg-white text-primary-700'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Yearly
                  <span className="ml-2 bg-accent-500 text-white text-xs py-0.5 px-2 rounded-full">Save 20%</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Pricing Plans */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <PlanCard 
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id)}
                isCurrentPlan={isAuthenticated && user?.subscription === plan.id}
              />
            ))}
          </div>
          
          <div className="max-w-2xl mx-auto mt-12 bg-primary-50 rounded-xl p-6 border border-primary-100">
            <div className="flex items-start">
              <div className="mr-4">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Our Promise</h3>
                <p className="text-gray-600 text-sm mb-2">
                  We're committed to providing a safe, engaging learning environment for your child.
                </p>
                <div className="flex flex-wrap gap-y-2">
                  <div className="w-full md:w-1/2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-success-500 mr-2" />
                    <span className="text-sm text-gray-700">30-day money-back guarantee</span>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-success-500 mr-2" />
                    <span className="text-sm text-gray-700">Cancel anytime</span>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-success-500 mr-2" />
                    <span className="text-sm text-gray-700">Safe, ad-free environment</span>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-success-500 mr-2" />
                    <span className="text-sm text-gray-700">COPPA-compliant privacy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Comparison Table */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-nunito font-bold text-3xl text-center text-gray-800 mb-10">
              Compare Plans
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Features</th>
                      <th className="py-4 px-6 text-center text-sm font-medium text-gray-500">Free</th>
                      <th className="py-4 px-6 text-center text-sm font-medium text-gray-500">Basic</th>
                      <th className="py-4 px-6 text-center text-sm font-medium text-primary-600">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 text-sm text-gray-800">Educational Games</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">4 games</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">All games</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">All games + early access</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 text-sm text-gray-800">Learning Activities</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">Basic activities</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">All basic activities</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">All activities & worksheets</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 text-sm text-gray-800">Child Profiles</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">1 profile</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">2 profiles</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">5 profiles (Unlimited on Annual)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 text-sm text-gray-800">Progress Tracking</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">Basic</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">Standard</td>
                      <td className="py-4 px-6 text-center text-sm text-gray-600">Detailed analytics</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 text-sm text-gray-800">Ad-Free Experience</td>
                      <td className="py-4 px-6 text-center">
                        <AlertTriangle className="h-5 w-5 text-warning-500 mx-auto" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Check className="h-5 w-5 text-success-500 mx-auto" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Check className="h-5 w-5 text-success-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 text-sm text-gray-800">Offline Mode</td>
                      <td className="py-4 px-6 text-center">
                        <AlertTriangle className="h-5 w-5 text-warning-500 mx-auto" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <AlertTriangle className="h-5 w-5 text-warning-500 mx-auto" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Check className="h-5 w-5 text-success-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 text-sm text-gray-800">Priority Support</td>
                      <td className="py-4 px-6 text-center">
                        <AlertTriangle className="h-5 w-5 text-warning-500 mx-auto" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <AlertTriangle className="h-5 w-5 text-warning-500 mx-auto" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Check className="h-5 w-5 text-success-500 mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-nunito font-bold text-3xl text-center text-gray-800 mb-10">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg text-gray-800 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-4">
                Still have questions about our subscription plans?
              </p>
              <Link to="/contact">
                <Button variant="outline">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-secondary-500 to-secondary-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-nunito font-bold text-3xl md:text-4xl mb-6">Ready to Start Learning?</h2>
          <p className="max-w-2xl mx-auto text-secondary-100 mb-8 text-lg">
            Join thousands of families who are giving their children the gift of engaging, effective education.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-white text-secondary-600 hover:bg-gray-100"
                >
                  Upgrade Now
                </Button>
                <Link to="/games">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Browse Games
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="bg-white text-secondary-600 hover:bg-gray-100"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

interface PlanCardProps {
  plan: SubscriptionPlan;
  isSelected: boolean;
  onSelect: () => void;
  isCurrentPlan: boolean;
}

const PlanCard = ({ plan, isSelected, onSelect, isCurrentPlan }: PlanCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all ${
        isSelected 
          ? `border-${plan.color}-500 shadow-md` 
          : 'border-transparent'
      } ${plan.mostPopular ? 'md:-mt-4 md:mb-4' : ''}`}
    >
      {plan.mostPopular && (
        <div className="bg-primary-600 py-2 text-center text-white text-sm font-medium">
          Most Popular
        </div>
      )}
      
      {plan.savings && (
        <div className="bg-accent-500 py-2 text-center text-white text-sm font-medium">
          {plan.savings}
        </div>
      )}
      
      <div className="p-6">
        <h3 className="font-nunito font-bold text-xl text-gray-800 mb-2">
          {plan.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {plan.description}
        </p>
        
        <div className="mb-6">
          {plan.price === 0 ? (
            <div className="text-3xl font-bold text-gray-800">Free</div>
          ) : (
            <div className="flex items-end">
              <span className="text-3xl font-bold text-gray-800">${plan.price}</span>
              <span className="text-gray-600 ml-1">/{plan.period}</span>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <Button 
            variant={plan.id === 'free' ? 'outline' : 'primary'} 
            fullWidth
            onClick={onSelect}
            className={
              plan.id !== 'free' 
                ? `bg-${plan.color}-600 hover:bg-${plan.color}-700`
                : ''
            }
            disabled={isCurrentPlan}
          >
            {isCurrentPlan 
              ? 'Current Plan' 
              : plan.id === 'free' 
                ? 'Get Started' 
                : 'Choose Plan'
            }
          </Button>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-3">Includes:</h4>
          <ul className="space-y-2">
            {plan.features.filter(feature => feature.included).slice(0, 5).map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className={`h-5 w-5 text-${plan.color}-500 mr-2 flex-shrink-0`} />
                <span className="text-sm text-gray-600">{feature.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {plan.id !== 'free' && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <div className="flex items-center mr-3">
              <CreditCard className="h-4 w-4 mr-1 text-gray-400" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SubscriptionPage;