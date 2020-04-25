/**
 * 教程
 */
module.exports = (mongoose) => {
    const Course = mongoose.model
        ('Course',
            {
                id: String,
                ctime: Date,
                utime: Date,
                title: String,
                type: String,
                priority: Number,
                titledesc: String,
                content: String,
                order: Number,
                url: String,
                local: String,
                status: String,
            }
        );
    return Course
}
