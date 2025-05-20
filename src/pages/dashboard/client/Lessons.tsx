import { courses } from "../../../utils/Courses";
import Layout from "./Layout";
import { motion } from "framer-motion";
import Notes from "./components/Notes";
import Revisions from "./Revisions";

const Lessons = () => {

  return (
    <div>
      <Layout>
        <motion.div
          className="px-6 py-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
           <Notes length={courses.length}/>
           <div className="w-full border border-slate-200"></div>
           <Revisions/>
        </motion.div>
      </Layout>
    </div>
  );
};

export default Lessons;
