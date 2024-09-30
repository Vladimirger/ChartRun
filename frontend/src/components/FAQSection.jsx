import { useState } from 'react';
import '../styles/FAQSection.css';


const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      question: "What is ChartRun?",
      answer: "ChartRun is an interactive platform that allows users to learn programming through flowcharts that run as real code. It provides a visual and intuitive approach to understanding coding concepts, making it ideal for beginners and visual learners."
    },
    {
      question: "How does learning with ChartRun differ from traditional programming courses?",
      answer: "With ChartRun, you can build and execute flowcharts that behave like actual code. This visual approach helps learners see the logic and flow of a program, making it easier to grasp complex concepts without worrying about syntax errors."
    },
    {
      question: "What programming languages are supported by ChartRun?",
      answer: "Currently, ChartRun supports Python. We are working to add more languages, such as JavaScript, C++, and Java, in the near future."
    },
    {
      question: "What topics are covered in the ChartRun courses?",
      answer: "ChartRun's courses cover a range of topics including variables, conditional statements (if-else), loops, switch-case statements, functions, and more advanced topics like data structures, algorithms, and object-oriented programming."
    },
    {
      question: "Can I use ChartRun if I am a complete beginner?",
      answer: "Absolutely! ChartRun is designed with beginners in mind. The platform offers step-by-step guidance, starting from the basics of programming, and gradually introduces more complex concepts."
    },
    {
      question: "Does ChartRun offer any certifications?",
      answer: "Yes, ChartRun provides completion certificates for each course. These certificates can be added to your resume or LinkedIn profile to showcase your programming skills."
    },
    {
      question: "Is there any cost associated with using ChartRun?",
      answer: "ChartRun offers both free and premium plans. The free plan gives you access to basic courses, while the premium plan unlocks advanced content, additional programming languages, and personalized support."
    },
    {
      question: "Can I run the flowcharts I create on ChartRun as real code?",
      answer: "Yes, all flowcharts created on ChartRun can be executed as real code. You can see how your logic works in real-time, making it a great way to test and refine your understanding."
    },
    {
      question: "Can I share my flowcharts with others?",
      answer: "Yes, ChartRun allows you to share your flowcharts with others, either as a static image or as a dynamic flowchart that others can interact with and modify."
    }
  ];
  

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-header">
        <h2>Ready for a game-changer?</h2>
        <p>Create content faster, engage audience better, spend less time.</p>
        <button className="try-chartrun-btn">
          <span className="btn-icon">⚡</span>
          Try ChartRun
        </button>
      </div>
      <div className="faq-container">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleQuestion(index)}>
                <span className={`arrow ${openQuestion === index ? 'open' : ''}`}>▼</span>
                <span>{faq.question}</span>
              </div>
              {openQuestion === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;