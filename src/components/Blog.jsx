import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { fadeInUp, staggerContainer, staggerItem, useScrollAnimation } from '../utils/animations';

const Blog = () => {
  const scrollAnimation = useScrollAnimation();
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 3);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog & Articles
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Sharing knowledge and insights about web development and technology
          </p>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full text-sm font-medium">
            <BookOpen size={16} />
            AI-Generated Content Coming Soon
          </div>
        </motion.div>

        {/* Featured Posts */}
        <motion.div
          {...scrollAnimation}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              className="card overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/20 dark:to-purple-900/20">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl opacity-50">📝</div>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                    Featured
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                >
                  Read More
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Recent Articles
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="card p-6 group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {post.title}
                </h4>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 text-sm"
                >
                  Read More
                  <ArrowRight size={14} />
                </motion.button>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Stay tuned for more technical articles and insights!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline"
            disabled
          >
            Subscribe to Newsletter (Coming Soon)
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
