import Base from '@/base/base.vue'
import iconUrlConfig from '@/cache/icon/config'
import {
    Upload as IUpload
} from 'iview'
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            uploadIconPath: iconUrlConfig['icon-draft-add'].url,
            totalCount: 0
        }
    },
    components: { IUpload },
    methods: {
        /**
         * 上传成功
         *
         * @param    {Object}           response                    相应对象
         * @param    {Object}           file                        文件对象
         * @param    {Array}            fileList                    已上传文件对象数组
         * @return   {void}
         */
        uploadSuccess (response, file, fileList) {
            if (response && response.code !== 200) {
                this.$Message.error(response.message)
                return
            }
            this.$emit('onaddicon')
        },
        /**
         * 文件已读取但未上传之前
         *
         * @param    {Object}           file                        文件对象
         * @return   {void}
         */
        beforeUpload (file = {}) {
            // 只读属性，不可修改
            // file.name = file.name.replace('.svg', '');
        },
        /**
         * icon上传失败
         *
         */
        uploadFail (error, file, fileList) {
            this.$Message.error(error)
            console.log(error)
        },
        /**
         * 上传文件格式错误
         *
         */
        uploadFormatError (file, fileList) {
            this.$Message.error('请上传svg文件！')
        }
    }
})
