import { createElement, Component, render } from 'rax';

import View from 'rax-view';
import Text from 'rax-text';
import dingtalk from 'dingtalk-javascript-sdk';

console.log(dingtalk)

class App extends Component{

	componentDidMount(){
		dingtalk.ready(function(){
			const dd = dingtalk.apis;
			dd.biz.navigation.setRight({
				show: true,
				control: true,
				text: 'icepy'
			});
		})
	}

	render(){
		return(
			<View>
				<Text onPress={
					()=>{
					  dingtalk.ready(function(){
					    const dd = dingtalk.apis;
							dd.biz.util.openLink({
						 		url: 'https://github.com/icepy'
							})
					  })
					}
				}>
					Hello World ICEPY !!!
				</Text>
			</View>
		);
	}
}

export default App;
