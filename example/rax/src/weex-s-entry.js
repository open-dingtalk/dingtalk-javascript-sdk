import { createElement, Component, render } from 'rax';

import View from 'rax-view';
import Text from 'rax-text';
import dingtalk from 'dingtalk-javascript-sdk';


class App extends Component{
	componentDidMount(){
		dingtalk.ready(function(){
			const dd = dingtalk.apis;
			dd.biz.navigation.setRight({
				show: true,
				control: true,
				text: '得到'
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

render(<App />);
