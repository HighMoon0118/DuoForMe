package ssafy;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.mapreduce.lib.input.FileSplit;

public class AllPairPartitionSelf {

	public static class MapClass1 extends Mapper<Object, Text, Text, Text> {
	
		private Text emitkey = new Text();
		
		private String Tablename;
		private int numberOfPartitions;
		
		protected void setup(Context context) throws IOException, InterruptedException {
			Configuration config = context.getConfiguration();
			
			Tablename = config.get("Tablename", "r");
			numberOfPartitions = config.getInt("numberOfPartitions", 2);
		}


		public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

			
			String[] tuple = value.toString().split("\t");
			Random rn = new Random();
			int recordID = Integer.parseInt(tuple[1]);
			int partitionID = recordID % numberOfPartitions;
			for(int i=0; i<numberOfPartitions; i++) {
				String text = "";
				if(tuple[0].equals(Tablename)) {
					if(i<=partitionID) emitkey.set("("+i+","+partitionID+")");
					else emitkey.set("("+partitionID+","+i+")");
					context.write(emitkey, value);
				}
			}
		}
	}


	public static class ReduceClass1 extends Reducer<Text, Text, Text, Text> {
	
		private Text emitval = new Text();
		
		public void setup(Context context) throws IOException {
			Configuration configuration = context.getConfiguration();
		}

		public void reduce(Text key, Iterable<Text> values, Context context) 
				throws IOException, InterruptedException {
			
			String s = new String();
			for(Text val : values) {
				s += ("\n"+val.toString());
			}
			emitval.set(s);
			context.write(key, emitval);
		}
	}


	/* Main function */
	public static void main(String[] args) throws IOException, InterruptedException, ClassNotFoundException {
		Configuration conf = new Configuration();
		String[] otherArgs = new GenericOptionsParser(conf,args).getRemainingArgs();
		if ( otherArgs.length != 4 ) {
			System.err.println("Usage: <Table1name> <numberOfPartitions> <in> <out>");
			System.exit(1);
		}
		
		FileSystem hdfs = FileSystem.get(conf);
		Path output = new Path(otherArgs[3]);
		if (hdfs.exists(output)) hdfs.delete(output, true);
		
		Job job = new Job(conf,"allpair-partition");
		Configuration config = job.getConfiguration();
		config.set("Tablename", otherArgs[0]);
		config.setInt("numberOfPartitions", Integer.parseInt(otherArgs[1]));
		
		job.setJarByClass(AllPairPartitionSelf.class);
		job.setMapperClass(MapClass1.class);
		job.setReducerClass(ReduceClass1.class);
		

		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		// set number of reduces
		job.setNumReduceTasks(1);

		// set input and output directories
		FileInputFormat.addInputPath(job,new Path(otherArgs[2]));
		FileOutputFormat.setOutputPath(job,new Path(otherArgs[3]));
		if(!job.waitForCompletion(true)) System.exit(1);
	}
}

