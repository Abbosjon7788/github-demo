import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipLoader } from 'react-spinners'

const Loader = ({ loading }) => {
     return (
          <AnimatePresence exitBeforeEnter={true}>
               {loading &&
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.2 }}
                         exit={{ opacity: 0 }}
                         className='loader'>
                         <ClipLoader color={'#0086ff'} size={40} />
                    </motion.div>
               }
          </AnimatePresence>
     )
}

export default Loader
